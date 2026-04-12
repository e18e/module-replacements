import {readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';
import {execSync} from 'node:child_process';
import type {ManifestModule} from '../src/types.js';

const DOWNLOADS_THRESHOLD = 10_000;

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const manifestsDir = path.resolve(scriptDir, '../manifests');

function getManifestFromMain(manifestPath: string): ManifestModule | null {
  const repoRoot = path.resolve(scriptDir, '..');
  const relativePath = path.relative(repoRoot, manifestPath);
  try {
    const content = execSync(`git show origin/main:${relativePath}`, {
      cwd: repoRoot,
      encoding: 'utf8'
    });
    return JSON.parse(content) as ManifestModule;
  } catch {
    return null;
  }
}

async function fetchWeeklyDownloads(moduleName: string): Promise<number> {
  const url = `https://api.npmjs.org/downloads/point/last-week/${moduleName}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch downloads for ${moduleName}: ${response.statusText}`
    );
  }
  const data = (await response.json()) as {downloads: number};
  return data.downloads;
}

async function main() {
  const manifestFiles = await readdir(manifestsDir);
  const failures: Array<{moduleName: string; downloads: number}> = [];

  for (const manifestName of manifestFiles) {
    if (!manifestName.endsWith('.json')) continue;

    const manifestPath = path.join(manifestsDir, manifestName);

    const currentContent = await import(manifestPath, {
      with: {type: 'json'}
    });
    const currentManifest = currentContent.default as ManifestModule;
    const mainManifest = getManifestFromMain(manifestPath);

    const currentMappings = currentManifest.mappings ?? {};
    const mainMappings = mainManifest?.mappings ?? {};

    const addedMappings = Object.entries(currentMappings).filter(
      ([key]) => !(key in mainMappings)
    );

    const currentReplacements = currentManifest.replacements ?? {};
    const mainReplacements = mainManifest?.replacements ?? {};

    const addedReplacements = Object.entries(currentReplacements).filter(
      ([key]) => !(key in mainReplacements)
    );

    const addedWithModuleName: string[] = [
      ...addedMappings.map(([, mapping]) => mapping.moduleName),
      ...addedReplacements.flatMap(([, replacement]) =>
        replacement.type === 'documented' ? [replacement.replacementModule] : []
      )
    ];

    for (const moduleName of addedWithModuleName) {
      console.log(`Checking downloads for ${moduleName}...`);
      const downloads = await fetchWeeklyDownloads(moduleName);
      console.log(
        `  ${moduleName}: ${downloads.toLocaleString()} weekly downloads`
      );
      if (downloads < DOWNLOADS_THRESHOLD) {
        failures.push({moduleName, downloads});
      }
    }
  }

  if (failures.length > 0) {
    console.error(
      '\nFailed: the following modules have too few weekly downloads:'
    );
    for (const {moduleName, downloads} of failures) {
      console.error(
        `  ${moduleName}: ${downloads.toLocaleString()} (threshold: ${DOWNLOADS_THRESHOLD.toLocaleString()})`
      );
    }
    process.exit(1);
  }

  console.log('\nAll checks passed.');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
