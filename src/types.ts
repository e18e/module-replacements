export interface EngineConstraint {
  engine: string;
  minVersion?: string;
  maxVersion?: string;
}

export interface KnownUrlDescriptor {
  type: 'mdn' | 'node' | 'e18e';
  id: string;
}

export type KnownUrl = KnownUrlDescriptor | string;

interface ModuleReplacementLike {
  id: string;
  engines?: EngineConstraint[];
  preferred?: boolean;
  url?: KnownUrl;
}

export interface DocumentedModuleReplacement extends ModuleReplacementLike {
  type: 'documented';
  replacementModule: string;
}

export interface NativeModuleReplacement extends ModuleReplacementLike {
  type: 'native';
  url: KnownUrl;
  description?: string;
  webFeatureId?: {
    featureId: string;
    compatKey: string;
  };
  nodeFeatureId?: {
    moduleName: string;
    exportName?: string;
  };
}

export interface SimpleModuleReplacement extends ModuleReplacementLike {
  type: 'simple';
  description: string;
  example?: string;
}

export interface RemovalReplacement extends ModuleReplacementLike {
  type: 'removal';
  description: string;
}

export type ModuleReplacement =
  | DocumentedModuleReplacement
  | NativeModuleReplacement
  | SimpleModuleReplacement
  | RemovalReplacement;

export interface ModuleReplacementMapping {
  type: 'module';
  moduleName: string;
  replacements: string[];
  url?: KnownUrl;
}

export interface ManifestModule {
  mappings: Record<string, ModuleReplacementMapping>;
  replacements: Record<string, ModuleReplacement>;
}
