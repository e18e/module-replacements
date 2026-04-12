import {ManifestModule} from './types.js';
import nativeRaw from '../manifests/native.json' with {type: 'json'};
import microUtilsRaw from '../manifests/micro-utilities.json' with {type: 'json'};
import preferredRaw from '../manifests/preferred.json' with {type: 'json'};

const nativeReplacements = nativeRaw as ManifestModule;
const microUtilsReplacements = microUtilsRaw as ManifestModule;
const preferredReplacements = preferredRaw as ManifestModule;

export * from './types.js';
export * from './util.js';

export {nativeReplacements, microUtilsReplacements, preferredReplacements};

export const all: ManifestModule = {
  replacements: {
    ...nativeReplacements.replacements,
    ...microUtilsReplacements.replacements,
    ...preferredReplacements.replacements
  },
  mappings: {
    ...nativeReplacements.mappings,
    ...microUtilsReplacements.mappings,
    ...preferredReplacements.mappings
  }
};
