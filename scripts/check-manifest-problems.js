import {readdir, readFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';
import vm from 'node:vm';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const manifestsDir = path.resolve(scriptDir, '../manifests');
const docsDir = path.resolve(scriptDir, '../docs/modules');
const seenModules = new Set();

async function checkManifestForDuplicates(name, manifest) {
  for (const moduleName of Object.keys(manifest.mappings)) {
    if (seenModules.has(moduleName)) {
      throw new Error(`Module ${moduleName} was found in multiple manifests`);
    }
    seenModules.add(moduleName);
  }
}

function checkManifestIsSorted(name, manifest) {
  const keys = Object.keys(manifest.mappings);
  const sorted = [...keys].sort();

  for (let i = 0; i < sorted.length; i++) {
    if (keys[i] !== sorted[i]) {
      throw new Error(
        `Manifest ${name} mappings should be sorted by module name (a-z)`
      );
    }
  }

  const replacementKeys = Object.keys(manifest.replacements);
  const sortedReplacementKeys = [...replacementKeys].sort();

  for (let i = 0; i < sortedReplacementKeys.length; i++) {
    if (replacementKeys[i] !== sortedReplacementKeys[i]) {
      throw new Error(
        `Manifest ${name} replacements should be sorted by id (a-z)`
      );
    }
  }
}

function checkNoEngines(name, manifest) {
  for (const [id, replacement] of Object.entries(manifest.replacements)) {
    if (replacement.engines !== undefined) {
      throw new Error(
        `Replacement ${id} in ${name} has engines set. Engines are populated automatically at publish time and should not be committed.`
      );
    }
  }
}

export async function checkManifestsForProblems() {
  console.log('Checking for problems in manifests...');
  const manifests = await readdir(manifestsDir);
  seenModules.clear();

  for (const manifestName of manifests) {
    if (!manifestName.endsWith('.json')) {
      continue;
    }

    const manifestPath = path.join(manifestsDir, manifestName);
    const manifest = JSON.parse(
      await readFile(manifestPath, {encoding: 'utf8'})
    );

    await checkManifestForDuplicates(manifestName, manifest);
    checkManifestIsSorted(manifestName, manifest);
    checkNoEngines(manifestName, manifest);
    checkExamplesAreValidJS(manifestName, manifest);
    await checkDocPathsExist(manifestName, manifest);
  }
  console.log('OK');
}

function checkExamplesAreValidJS(name, manifest) {
  for (const [id, replacement] of Object.entries(manifest.replacements)) {
    if (replacement.example !== undefined) {
      try {
        new vm.SourceTextModule(replacement.example);
      } catch (err) {
        throw new Error(
          `Replacement ${id} in ${name} has an invalid JS example: ${err.message}`
        );
      }
    }
  }
}

async function checkDocExists(name, id, label) {
  const docFile = path.join(docsDir, `${id}.md`);
  try {
    await access(docFile);
  } catch {
    throw new Error(
      `${label} in ${name} has e18e url "${id}" but ${id}.md does not exist in docs/modules/`
    );
  }
}

async function checkDocPathsExist(name, manifest) {
  for (const [moduleName, mapping] of Object.entries(manifest.mappings)) {
    const url = mapping.url;
    if (url && typeof url !== 'string' && url.type === 'e18e') {
      await checkDocExists(name, url.id, `Module ${moduleName}`);
    }
  }

  for (const [id, replacement] of Object.entries(manifest.replacements)) {
    const url = replacement.url;
    if (url && typeof url !== 'string' && url.type === 'e18e') {
      await checkDocExists(name, url.id, `Replacement ${id}`);
    }
  }
}
