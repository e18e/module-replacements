---
description: Modern alternatives to the eslint-plugin-vitest package for jest-dom-specific linting rules
---

# Replacements for `eslint-plugin-jest-dom`

## `eslint-plugin-jest-dom-ya`

[`eslint-plugin-jest-dom-ya`](https://github.com/G-Rath/eslint-plugin-jest-dom-ya) is the actively maintained successor forked by an established contributor, with ESLint v10 support and continued development.

```ts
import jestDomPlugin from 'eslint-plugin-jest-dom' // [!code --]
import jestDomYaPlugin from 'eslint-plugin-jest-dom-ya' // [!code ++]

export default [
  jestDomPlugin.configs["flat/recommended"], // [!code --]
  jestDomYaPlugin.configs["flat/recommended"], // [!code ++]
  {
    plugins: {
      'jest-dom': jestDomPlugin // [!code --]
      'jest-dom-ya': jestDomYaPlugin // [!code ++]
    },
    rules: {
      "jest-dom/prefer-checked": "error", // [!code --]
      "jest-dom-ya/prefer-checked": "error",  // [!code ++]
      "jest-dom/prefer-enabled-disabled": "error", // [!code --]
      "jest-dom-ya/prefer-enabled-disabled": "error"  // [!code ++]
    }
  }
]
```

If you're using a legacy config format:

```ts
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:jest-dom/recommended', // [!code --]
    'plugin:jest-dom-ya/recommended' // [!code ++]
  ],
  rules: {
    'jest-dom/prefer-checked': 'error', // [!code --]
    'jest-dom-ya/prefer-checked': 'error' // [!code ++]
  }
}
```
