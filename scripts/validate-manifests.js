import ajv from 'ajv';
import {readdir, readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';
import {features as webFeatures} from 'web-features';

const validator = new ajv();
const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const manifestsDir = path.resolve(scriptDir, '../manifests');
const schemaPath = path.resolve(scriptDir, '../manifest-schema.json');

export async function validateManifests() {
  console.log('Validating manifests against JSON schema...');
  const manifests = await readdir(manifestsDir);
  const schema = JSON.parse(await readFile(schemaPath, {encoding: 'utf8'}));
  const validate = validator.compile(schema);

  for (const manifestName of manifests) {
    if (!manifestName.endsWith('.json')) {
      continue;
    }

    const manifestPath = path.join(manifestsDir, manifestName);
    const manifest = JSON.parse(
      await readFile(manifestPath, {encoding: 'utf8'})
    );
    const isValid = validate(manifest);
    if (!isValid) {
      console.log(validate.errors);
      throw new Error(`Validation for ${manifestPath} failed!`);
    }

    for (const [id, replacement] of Object.entries(manifest.replacements)) {
      if (replacement.id !== id) {
        throw new Error(
          `${manifestPath}: replacement key "${id}" does not match its id property "${replacement.id}"`
        );
      }

      if (!replacement.webFeatureId) continue;

      const {featureId, compatKey} = replacement.webFeatureId;
      const feature = webFeatures[featureId];

      if (!feature) {
        throw new Error(
          `${manifestPath}: replacement "${id}" has unknown webFeatureId.featureId "${featureId}"`
        );
      }

      if (!feature.compat_features?.includes(compatKey)) {
        throw new Error(
          `${manifestPath}: replacement "${id}" has compatKey "${compatKey}" not found in web-features feature "${featureId}"`
        );
      }

      if (replacement.type === 'simple' && !id.startsWith('snippet::')) {
        throw new Error(
          `${manifestPath}: replacement "${id}" is type "simple" and must start with the "snippet::" prefix.`
        );
      }
    }

    const usedReplacementIds = new Set();

    for (const [key, mapping] of Object.entries(manifest.mappings)) {
      if (mapping.type === 'module' && mapping.moduleName !== key) {
        throw new Error(
          `${manifestPath}: mapping key "${key}" does not match its moduleName "${mapping.moduleName}"`
        );
      }

      for (const replacementId of mapping.replacements) {
        const replacement = manifest.replacements[replacementId];

        if (!replacement) {
          throw new Error(
            `${manifestPath}: mapping "${key}" references unknown replacement "${replacementId}"`
          );
        }

        if (replacement.replacementModule === key) {
          throw new Error(
            `${manifestPath}: mapping "${key}" defines a replacementModule that is identical to itself.`
          );
        }

        usedReplacementIds.add(replacementId);
      }
    }

    for (const id of Object.keys(manifest.replacements)) {
      if (!usedReplacementIds.has(id)) {
        throw new Error(
          `${manifestPath}: replacement "${id}" is defined but not used by any mapping.`
        );
      }
    }
  }
  console.log('OK');
}
