---
description: Modern alternative to eslint-plugin-import, which helps with linting of ES6+ import/export syntax
---

# Replacements for `eslint-plugin-import`

## `eslint-plugin-import-x`

[`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) is a modern fork of [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import). `import-x` focuses on having a smaller dependency footprint and faster module resolution via a Rust-based resolver.

### Flat config

<!-- prettier-ignore -->
```ts
import importPlugin from 'eslint-plugin-import' // [!code --]
import { createNodeResolver, importX } from 'eslint-plugin-import-x' // [!code ++]
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript' // [!code ++]

export default [
  importPlugin.flatConfigs.recommended, // [!code --]
  importX.flatConfigs.recommended, // [!code ++]
  {
    settings: {
      'import/resolver': { typescript: true }, // [!code --]
      'import-x/resolver-next': [ // [!code ++]
        createTypeScriptImportResolver(), // [!code ++]
        createNodeResolver() // [!code ++]
      ] // [!code ++]
    },
    rules: {
      'import/no-unresolved': 'error', // [!code --]
      'import-x/no-unresolved': 'error', // [!code ++]
      'import/no-nodejs-modules': 'warn', // [!code --]
      'import-x/no-nodejs-modules': 'warn' // [!code ++]
    }
  }
]
```

### Legacy config

```ts
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended', // [!code --]
    'plugin:import-x/recommended', // [!code ++]
    'plugin:import/typescript', // [!code --]
    'plugin:import-x/typescript' // [!code ++]
  ],
  plugins: [
    'import', // [!code --]
    'import-x' // [!code ++]
  ],
  settings: {
    'import/resolver': { typescript: true }, // [!code --]
    'import-x/resolver': { typescript: true } // [!code ++]
  },
  rules: {
    'import/no-unresolved': 'error', // [!code --]
    'import-x/no-unresolved': 'error' // [!code ++]
  }
}
```

## `oxlint`

[`oxlint`](https://oxc.rs/docs/guide/usage/linter.html) is a Rust-based linter for JavaScript and TypeScript that is compatible with ESLint. It has ports of most rules from ESLint and its popular plugins, including `eslint-plugin-import`.

Oxlint is intended to be backwards-compatible with ESLint as much as possible, but not all rules are implemented yet, and some are not planned to be implemented at all. See [the GitHub issue](https://github.com/oxc-project/oxc/issues/1117) for specifics.

The migration process from ESLint is covered in [the Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html) and can usually be done automatically from an ESLint flat config using [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate).

> [!NOTE]

## Oxlint

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) is a high-performance linter for JavaScript and TypeScript, built on the Rust-based `Oxc` compiler stack. It's intended to be fully backwards-compatible with ESLint, having ported most of the ESLint rules, as well as those from popular plugins including `eslint-plugin-import`.

The migration process from ESLint is covered in [the Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html), and can be done automatically from an ESLint flat config using [`npx @oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate).

> [!NOTE]
> Oxlint is not necessarily a full drop-in replacement, as not all of the `eslint-plugin-import` rules have been, or will be, implemented. Check [the GitHub issue](https://github.com/oxc-project/oxc/issues/1117) to view the progress.
