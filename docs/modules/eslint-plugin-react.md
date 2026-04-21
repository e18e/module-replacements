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
