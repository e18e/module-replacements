---
description: Modern alternatives to the rollup-plugin-terser package for minifying Rollup output
---

# Replacements for `rollup-plugin-terser`

## `@rollup/plugin-terser`

[`rollup-plugin-terser`](https://github.com/TrySound/rollup-plugin-terser) is deprecated and no longer maintained. [`@rollup/plugin-terser`](https://github.com/rollup/plugins/tree/master/packages/terser) is its official successor, maintained by the Rollup team. The options are unchanged, but the plugin is now a default export rather than a named one.

Example:

```js
import { terser } from 'rollup-plugin-terser' // [!code --]
import terser from '@rollup/plugin-terser' // [!code ++]

export default {
  plugins: [terser()]
}
```
