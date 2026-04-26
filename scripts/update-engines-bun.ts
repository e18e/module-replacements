import {readdir, readFile, writeFile} from 'node:fs/promises';
import {format, resolveConfig} from 'prettier';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';
import type {ManifestModule, ModuleReplacement} from '../src/types.js';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const manifestsDir = path.resolve(scriptDir, '../manifests');

const BUN_MIN_VERSION = '1.0.0';

/**
 * Ensure any `Bun.*` replacement has a bun engine constraint.
 *
 * We can't discover the actual minimum version per API, so we set 1.0.0
 * to prevent these replacements being suggested for non-bun engines.
 */
function updateReplacementEngines(
  replacement: ModuleReplacement
): ModuleReplacement {
  if (!replacement.id.startsWith('Bun.')) {
    return replacement;
  }

  const otherEngines =
    replacement.engines?.filter((e) => e.engine !== 'bun') ?? [];
  const existingBun = replacement.engines?.find((e) => e.engine === 'bun');

  if (existingBun && existingBun.minVersion === BUN_MIN_VERSION) {
    return replacement;
  }

  return {
    ...replacement,
    engines: [...otherEngines, {engine: 'bun', minVersion: BUN_MIN_VERSION}]
  };
}

async function main() {
  console.log('Updating bun engines for Bun.* replacements...\n');

  const manifestFiles = await readdir(manifestsDir);

  for (const manifestName of manifestFiles) {
    if (!manifestName.endsWith('.json')) {
      continue;
    }

    console.log(`Processing ${manifestName}...`);

    const manifestPath = path.join(manifestsDir, manifestName);
    const manifestContent = await readFile(manifestPath, {encoding: 'utf8'});
    const manifest: ManifestModule = JSON.parse(manifestContent);

    const updatedManifest: ManifestModule = {
      ...manifest,
      replacements: Object.fromEntries(
        Object.entries(manifest.replacements).map(([id, replacement]) => [
          id,
          updateReplacementEngines(replacement)
        ])
      )
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
