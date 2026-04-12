import {readdir, readFile, writeFile} from 'node:fs/promises';
import {format, resolveConfig} from 'prettier';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';
import type {ManifestModule, ModuleReplacement} from '../src/types.js';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const manifestsDir = path.resolve(scriptDir, '../manifests');

interface DocumentedUnknownNode {
  // This isn't actually in the response but forces us to narrow the type
  // correctly since the response contains many types we don't care about
  // and the ones we do.
  type: 'unknown';
}

interface DocumentedMeta {
  added: string[];
}

interface DocumentedNodeClassMethod {
  type: 'classMethod';
  name: string;
  meta: DocumentedMeta;
}

interface DocumentedNodeMethod {
  type: 'method';
  name: string;
  meta: DocumentedMeta;
}

interface DocumentedNodeProperty {
  type: string;
  name: string;
  meta: DocumentedMeta;
}

interface DocumentedNodeClass {
  type: 'class';
  name: string;
  meta: DocumentedMeta;
  modules?: Array<DocumentedNodeModule | DocumentedUnknownNode>;
  classMethods?: Array<DocumentedNodeClassMethod | DocumentedUnknownNode>;
}

interface DocumentedNodeModule {
  type: 'module';
  name: string;
  introduced_in?: string;
  stability?: number;
  modules?: Array<DocumentedNodeModule | DocumentedUnknownNode>;
  classes?: Array<DocumentedNodeClass | DocumentedUnknownNode>;
  properties?: Array<DocumentedNodeProperty>;
  methods?: Array<DocumentedNodeMethod | DocumentedUnknownNode>;
}

interface RootDocumentedNodeModule {
  type: 'module';
  modules: DocumentedNodeModule[];
}

// Maps subpath module names (after stripping node: prefix) to the base module
// JSON file and the submodule name within it, since the submodule names don't
// match the subpath (e.g. fs/promises is promises_api inside fs.json).
const SUBPATH_MAP: Record<string, {base: string; submodule: string}> = {
  'fs/promises': {base: 'fs', submodule: 'promises_api'},
  module: {base: 'module', submodule: 'the_`module`_object'}
};

function resolveModuleName(moduleName: string): {
  base: string;
  submodule?: string;
} {
  const stripped = moduleName.replace(/^node:/, '');
  return SUBPATH_MAP[stripped] ?? {base: stripped};
}

const moduleDataCache = new Map<string, RootDocumentedNodeModule>();

async function fetchNodeModuleData(
  base: string
): Promise<RootDocumentedNodeModule | null> {
  if (moduleDataCache.has(base)) {
    return moduleDataCache.get(base)!;
  }

  const url = `https://nodejs.org/api/${base}.json`;
  try {
    console.log(`Fetching Node.js docs for ${base}...`);
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Warning: Failed to fetch ${url}: ${response.statusText}`);
      return null;
    }
    const data = (await response.json()) as RootDocumentedNodeModule;
    moduleDataCache.set(base, data);
    return data;
  } catch (error) {
    console.warn(`Warning: Error fetching ${url}:`, error);
    return null;
  }
}

function earliestVersion(versions: string[]): string {
  return versions
    .map((v) => v.replace(/^v/, ''))
    .sort((a, b) => {
      const [aMaj = 0, aMin = 0, aPatch = 0] = a.split('.').map(Number);
      const [bMaj = 0, bMin = 0, bPatch = 0] = b.split('.').map(Number);
      if (aMaj !== bMaj) return aMaj - bMaj;
      if (aMin !== bMin) return aMin - bMin;
      return aPatch - bPatch;
    })[0];
}

function findExportVersion(
  module: DocumentedNodeModule,
  exportName: string,
  lastIntroducedIn?: string
): string | null {
  const introducedIn =
    module.introduced_in?.replace(/^v/, '') ?? lastIntroducedIn;

  for (const item of module.methods ?? []) {
    if (item.type === 'method' && item.name === exportName) {
      return item.meta?.added
        ? earliestVersion(item.meta.added)
        : (introducedIn ?? null);
    }
  }

  for (const item of module.properties ?? []) {
    if (item.name === exportName) {
      return item.meta?.added
        ? earliestVersion(item.meta.added)
        : (introducedIn ?? null);
    }
  }

  for (const item of module.classes ?? []) {
    if (item.type === 'class' && item.name === exportName) {
      return item.meta?.added
        ? earliestVersion(item.meta.added)
        : (introducedIn ?? null);
    }
  }

  for (const sub of module.modules ?? []) {
    if (sub.type === 'module') {
      const found = findExportVersion(sub, exportName, introducedIn);
      if (found) return found;
    }
  }

  return null;
}

function findSubmodule(
  module: DocumentedNodeModule,
  name: string
): DocumentedNodeModule | null {
  for (const sub of module.modules ?? []) {
    if (sub.type !== 'module') continue;
    if (sub.name === name) return sub;
    const found = findSubmodule(sub, name);
    if (found) return found;
  }
  return null;
}

async function getNodeVersion(
  moduleName: string,
  exportName?: string
): Promise<string | null> {
  const {base, submodule} = resolveModuleName(moduleName);
  const data = await fetchNodeModuleData(base);
  if (!data) return null;

  let rootModule = data.modules[0];
  if (!rootModule) return null;

  if (submodule) {
    const sub = findSubmodule(rootModule, submodule);
    if (!sub) return null;
    rootModule = sub;
  }

  if (!exportName) {
    if (rootModule.introduced_in) {
      return rootModule.introduced_in.replace(/^v/, '');
    }
    return null;
  }

  return findExportVersion(rootModule, exportName);
}

async function updateReplacementNodeEngine(
  replacement: ModuleReplacement
): Promise<ModuleReplacement> {
  if (replacement.type !== 'native' || !replacement.nodeFeatureId) {
    return replacement;
  }

  const {moduleName, exportName} = replacement.nodeFeatureId;
  const nodeVersion = await getNodeVersion(moduleName, exportName);

  if (!nodeVersion) {
    console.warn(
      `Warning: Could not find Node.js version for ${moduleName}${exportName ? `.${exportName}` : ''}`
    );
    return replacement;
  }

  const existingNodeEngine = replacement.engines?.find(
    (e) => e.engine === 'nodejs'
  );

  if (existingNodeEngine?.minVersion === nodeVersion) {
    return replacement;
  }

  const otherEngines =
    replacement.engines?.filter((e) => e.engine !== 'nodejs') ?? [];

  return {
    ...replacement,
    engines: [...otherEngines, {engine: 'nodejs', minVersion: nodeVersion}]
  };
}

async function main() {
  console.log('Updating Node.js engine constraints from nodejs.org docs...\n');

  const manifestFiles = await readdir(manifestsDir);

  for (const manifestName of manifestFiles) {
    if (!manifestName.endsWith('.json')) {
      continue;
    }

    console.log(`Processing ${manifestName}...`);

    const manifestPath = path.join(manifestsDir, manifestName);
    const manifestContent = await readFile(manifestPath, {encoding: 'utf8'});
    const manifest: ManifestModule = JSON.parse(manifestContent);

    const updatedReplacements: Record<string, ModuleReplacement> = {};
    for (const [id, replacement] of Object.entries(manifest.replacements)) {
      updatedReplacements[id] = await updateReplacementNodeEngine(replacement);
    }

    const updatedManifest: ManifestModule = {
      ...manifest,
      replacements: updatedReplacements
    };

    const prettierOptions = await resolveConfig(manifestPath);
    await writeFile(
      manifestPath,
      await format(JSON.stringify(updatedManifest), {
        ...prettierOptions,
        filepath: manifestPath
      }),
      {encoding: 'utf8'}
    );

    console.log(`  ✓ Updated ${manifestName}\n`);
  }

  console.log('Done!');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
