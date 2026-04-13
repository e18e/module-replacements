---
description: Native Node.js alternatives to the core-util-is package
---

# Replacements for `core-util-is`

## `util.types` (native, Node.js)

[`util.types`](https://nodejs.org/api/util.html#utiltypes) is an official, cross‑realm type checks for built-in objects (Date, RegExp, Error, typed arrays, etc.)

Example:

```diff
- import * as cui from 'core-util-is'
+ import { types } from 'node:util'

- const isDate = cui.isDate(value)
+ const isDate = types.isDate(value)
```
