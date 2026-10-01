---
description: Modern alternatives to the rollup-plugin-commonjs package for bundling CommonJS modules with Rollup
---

# Replacements for `rollup-plugin-commonjs`

## `@rollup/plugin-commonjs`

[`rollup-plugin-commonjs`](https://github.com/rollup/rollup-plugin-commonjs) is deprecated; its last release (10.1.0) dates from 2019 and npm points to [`@rollup/plugin-commonjs`](https://github.com/rollup/plugins/tree/master/packages/commonjs), the official successor maintained by the Rollup team. The current version needs Rollup 2.68 or newer. The plugin is still a default export, so for most configurations only the import changes.

Example:

```js
import commonjs from 'rollup-plugin-commonjs' // [!code --]
import commonjs from '@rollup/plugin-commonjs' // [!code ++]

export default {
  plugins: [commonjs()]
}
```
