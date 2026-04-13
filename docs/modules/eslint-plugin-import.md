---
description: Modern alternative to eslint-plugin-import, which helps with linting of ES6+ import/export syntax
---

# Replacements for `eslint-plugin-import`

## `eslint-plugin-import-x`

[`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) is a modern fork of [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import). `import-x` focuses on faster module resolution via a Rust-based resolver, a smaller dependency footprint

### Flat config

<!-- prettier-ignore -->
```diff
- import importPlugin from 'eslint-plugin-import'
+ import { createNodeResolver, importX } from 'eslint-plugin-import-x'
+ import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
  
  export default [
-   importPlugin.flatConfigs.recommended,
+   importX.flatConfigs.recommended,
    {
      settings: {
-       'import/resolver': { typescript: true },
+       'import-x/resolver-next': [
+         createTypeScriptImportResolver(),
+         createNodeResolver()
+       ]
      },
      rules: {
-       'import/no-unresolved': 'error',
+       'import-x/no-unresolved': 'error',
-       'import/no-nodejs-modules': 'warn',
+       'import-x/no-nodejs-modules': 'warn'
      }
    }
  ]
```

### Legacy config

```diff
  module.exports = {
    extends: [
      'eslint:recommended',
-     'plugin:import/recommended',
+     'plugin:import-x/recommended',
-     'plugin:import/typescript',
+     'plugin:import-x/typescript'
    ],
    plugins: [
-     'import',
+     'import-x'
    ],
    settings: {
-     'import/resolver': { typescript: true },
+     'import-x/resolver': { typescript: true }
    },
    rules: {
-     'import/no-unresolved': 'error',
+     'import-x/no-unresolved': 'error'
    }
  }
```
