---
description: Modern alternatives to the pkg-dir package for finding package root directories
---

# Replacements for `pkg-dir`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```diff
+ import { dirname } from 'node:path'
+ import * as pkg from 'empathic/package'
- import { packageDirectory } from 'pkg-dir'

- const dir = await packageDirectory()
+ const dir = dirname(pkg.up())
```
