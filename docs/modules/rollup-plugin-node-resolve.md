---
description: Modern alternative to rollup-plugin-node-resolve for resolving Node.js modules in Rollup
---

# Replacements for `rollup-plugin-node-resolve`

## `@rollup/plugin-node-resolve`

[`rollup-plugin-node-resolve`](https://github.com/rollup/rollup-plugin-node-resolve) is deprecated and no longer maintained. [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve) is its official successor, maintained by the Rollup team.

The replacement uses a named `nodeResolve` export instead of the previous default export.

Example:

```js
import resolve from 'rollup-plugin-node-resolve' // [!code --]
import { nodeResolve } from '@rollup/plugin-node-resolve' // [!code ++]

export default {
  plugins: [resolve()] // [!code --]
  plugins: [nodeResolve()] // [!code ++]
}
```
