---
description: Modern alternatives to the eslint-plugin-react package for React/JSX-specific linting rules
---

# Replacements for `eslint-plugin-react`

## `@eslint-react/eslint-plugin`

[`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react) is not a drop-in replacement, but a feature‑rich alternative that covers many of the same (and additional) rules.

Flat config example:

```ts
import eslintReact from '@eslint-react/eslint-plugin' // [!code ++]
import reactPlugin from 'eslint-plugin-react' // [!code --]

export default [
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin, // [!code --]
      '@eslint-react': eslintReact // [!code ++]
    },
    rules: {
      ...reactPlugin.configs.recommended.rules, // [!code --]
      ...eslintReact.configs.recommended.rules, // [!code ++]

      'react/no-unknown-property': 'error', // [!code --]
      '@eslint-react/dom/no-unknown-property': 'error' // [!code ++]
    }
  }
]
```

> [!NOTE]
> `@eslint-react/eslint-plugin` is not a drop‑in replacement. Use [their migration guide](https://www.eslint-react.xyz/docs/migrating-from-eslint-plugin-react) to map rules/options and automate changes where possible.

## `oxlint`

[`oxlint`](https://oxc.rs/docs/guide/usage/linter.html) is a Rust-based linter for JavaScript and TypeScript that is compatible with ESLint. It has most of the rules from ESLint and its popular plugins ported, including `eslint-plugin-react` (as well as a few `eslint-plugin-react-hooks` rules).

Oxlint is intended to be backwards-compatible with ESLint as much as possible, but not all rules are implemented yet, and some are not planned to be implemented at all. See [the GitHub issue](https://github.com/oxc-project/oxc/issues/1022) for specifics.

[JS Plugins](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) are supported and are compatible with ESLint plugins if there are other ESLint plugins needing to be migrated. JS Plugins can also be used to migrate React Compiler rules over to Oxlint if needed.

The migration process from ESLint is covered in [the Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html) and can usually be done automatically from an ESLint flat config using [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate).

> [!NOTE]
> `oxlint` is not necessarily a full, drop‑in replacement. See [the GitHub issue](https://github.com/oxc-project/oxc/issues/1022) for rules from `eslint-plugin-react` that are not yet implemented or not planned to be implemented.
