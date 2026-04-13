---
description: Modern alternatives to the eslint-plugin-es package for ECMAScript feature linting
---

# Replacements for `eslint-plugin-es`

## `eslint-plugin-es-x`

[eslint-plugin-es-x](https://github.com/eslint-community/eslint-plugin-es-x) is a direct fork which is actively maintained. It has new features, bugfixes and updated dependencies.

```diff
- import { FlatCompat } from '@eslint/eslintrc'
- import pluginES from 'eslint-plugin-es'
+ import pluginESx from 'eslint-plugin-es-x'

- const compat = new FlatCompat()

  export default [
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 2020
      },
      plugins: {
-       es: pluginES,
+       'es-x': pluginESx
      },
      rules: {
-       'es/no-regexp-lookbehind-assertions': 'error',
+       'es-x/no-regexp-lookbehind-assertions': 'error'
      }
    },

-   ...compat.extends('plugin:es/restrict-to-es2018'),
+   pluginESx.configs['flat/restrict-to-es2018']
  ]
```

If you're using a legacy config format:

```diff
  module.exports = {
    extends: [
      'eslint:recommended',
-     'plugin:es/restrict-to-es2018',
+     'plugin:es-x/restrict-to-es2018'
    ],
    plugins: [
-     'es',
+     'es-x'
    ],
    rules: {
-     'es/no-regexp-lookbehind-assertions': 'error',
+     'es-x/no-regexp-lookbehind-assertions': 'error'
    }
  }
```
