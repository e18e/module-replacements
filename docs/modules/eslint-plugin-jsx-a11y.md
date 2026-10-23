---
description: Modern alternatives to eslint-plugin-jsx-a11y for accessibility linting of JSX
---

# Replacements for `eslint-plugin-jsx-a11y`

`eslint-plugin-jsx-a11y` still supports very old ESLint and Node versions, which pulls in far more dependencies than it needs.

## `eslint-plugin-jsx-a11y-x`

[`eslint-plugin-jsx-a11y-x`](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x) is a fork of [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) with far fewer dependencies and full support for flat config and ESLint v10.

> [!NOTE]
> `eslint-plugin-jsx-a11y-x` is still being modernised, so treat it as experimental for now.

Rename the import, use `configs` instead of `flatConfigs`, and change the rule prefix from `jsx-a11y/` to `jsx-a11y-x/`:

<!-- prettier-ignore -->
```ts
import jsxA11y from 'eslint-plugin-jsx-a11y' // [!code --]
import jsxA11yX from 'eslint-plugin-jsx-a11y-x' // [!code ++]

export default [
  {
    files: ['**/*.{jsx,tsx}'],
    ...jsxA11y.flatConfigs.recommended, // [!code --]
    ...jsxA11yX.configs.recommended, // [!code ++]
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules, // [!code --]
      ...jsxA11yX.configs.recommended.rules, // [!code ++]
      'jsx-a11y/no-autofocus': 'off', // [!code --]
      'jsx-a11y-x/no-autofocus': 'off' // [!code ++]
    },
    settings: {
      'jsx-a11y': { components: { Image: 'img' } }, // [!code --]
      'jsx-a11y-x': { components: { Image: 'img' } } // [!code ++]
    }
  }
]
```

> [!NOTE]
> Settings under the old `jsx-a11y` key are ignored without a warning, so make sure to rename that key too. The deprecated `accessible-emoji`, `label-has-for` and `no-onchange` rules no longer exist and should be removed. See [the migration notes](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x#migrating-from-eslint-plugin-jsx-a11y) for the full list.

## Oxlint

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) is a high-performance linter for JavaScript and TypeScript, built on the Rust-based `Oxc` compiler stack. It has ported [all of the non-deprecated `eslint-plugin-jsx-a11y` rules](https://github.com/oxc-project/oxc/issues/1141).

The migration process from ESLint is covered in [the Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html), and can be done automatically from an ESLint flat config using [`npx @oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate).
