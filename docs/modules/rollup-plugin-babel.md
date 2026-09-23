---
description: Modern alternative to rollup-plugin-babel for using Babel with Rollup
---

# Replacements for `rollup-plugin-babel`

## `@rollup/plugin-babel`

[`rollup-plugin-babel`](https://github.com/rollup/rollup-plugin-babel) is deprecated. Its replacement, [`@rollup/plugin-babel`](https://github.com/rollup/plugins/tree/master/packages/babel), is maintained in Rollup's official plugins repository.

The main migration change is replacing the default `babel` import with a named import. The current plugin also requires an explicit `babelHelpers` option.

Example:

```js
import babel from 'rollup-plugin-babel' // [!code --]
import { babel } from '@rollup/plugin-babel' // [!code ++]

export default {
  plugins: [babel()] // [!code --]
  plugins: [babel({ babelHelpers: 'bundled' })] // [!code ++]
}
```
