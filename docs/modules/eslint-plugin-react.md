---
description: Modern alternatives to the eslint-plugin-react package for React/JSX-specific linting rules
---

# Replacements for `eslint-plugin-react`

## `@eslint-react/eslint-plugin`

[`@eslint-react/eslint-plugin`](https://github.com/Rel1cx/eslint-react) is not a drop-in replacement, but a feature‑rich alternative that covers many of the same (and additional) rules.

Flat config example:

```diff
+ import eslintReact from '@eslint-react/eslint-plugin'
- import reactPlugin from 'eslint-plugin-react'

  export default [
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: {
-       react: reactPlugin,
+       '@eslint-react': eslintReact
      },
      rules: {
-       ...reactPlugin.configs.recommended.rules,
+       ...eslintReact.configs.recommended.rules,

-       'react/no-unknown-property': 'error',
+       '@eslint-react/dom/no-unknown-property': 'error'
      }
    }
  ]
```

> [!NOTE]
> `@eslint-react/eslint-plugin` is not a drop‑in replacement. Use [their migration guide](https://eslint-react.xyz/docs/migration) to map rules/options and automate changes where possible.
