---
description: Modern alternatives to the eslint-plugin-eslint-comments package for ESLint comment linting
---

# Replacements for `eslint-plugin-eslint-comments`

## `@eslint-community/eslint-plugin-eslint-comments`

[`@eslint-community/eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments) is the actively maintained successor with updated dependencies, flat config support, and continued development.

```diff
- import eslintComments from 'eslint-plugin-eslint-comments'
+ import commentsCommunity from '@eslint-community/eslint-plugin-eslint-comments/configs'

  export default [
+   commentsCommunity.recommended,
    {
      plugins: {
-       'eslint-comments': eslintComments
      },
      rules: {
-       'eslint-comments/no-unused-disable': 'error',
+       '@eslint-community/eslint-comments/no-unused-disable': 'error'
      }
    }
  ]
```

If you're using a legacy config format:

```diff
  module.exports = {
    extends: [
      'eslint:recommended',
-     'plugin:eslint-comments/recommended',
+     'plugin:@eslint-community/eslint-comments/recommended'
    ],
    rules: {
-     'eslint-comments/no-unused-disable': 'error',
+     '@eslint-community/eslint-comments/no-unused-disable': 'error'
    }
  }
```
