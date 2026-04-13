---
description: Modern alternatives to the find-pkg package for finding package.json files
---

# Replacements for `find-pkg`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```diff
+ import * as pkg from 'empathic/package'
- import findPkg from 'find-pkg'

- await findPkg(path)
+ pkg.up(path)
```
