---
description: Modern alternatives to the eslint-plugin-node package for Node.js-specific linting rules
---

# Replacements for `eslint-plugin-node`

## `eslint-plugin-n`

[`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) is a direct fork which is actively maintained. It has new features, bugfixes and updated dependencies.

```diff
+ import nPlugin from 'eslint-plugin-n'
- import nodePlugin from 'eslint-plugin-node'

  export default [
    {
      files: ['**/*.js'], // or any other pattern
      plugins: {
-       node: nodePlugin,
+       n: nPlugin
      },
      rules: {
-       ...nodePlugin.configs['recommended-script'].rules,
+       ...nPlugin.configs['recommended-script'].rules,
-       'node/exports-style': ['error', 'module.exports'],
+       'n/exports-style': ['error', 'module.exports']
      }
    }
  ]
```

If you're using a legacy config format:

```diff
  module.exports = {
    extends: [
      'eslint:recommended',
-     'plugin:node/recommended',
+     'plugin:n/recommended'
    ]
  }
```
