---
description: Modern alternatives to the find-cache-dir package for locating cache directories
---

# Replacements for `find-cache-dir`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

Example:

```diff
+ import * as pkg from 'empathic'
- import findCacheDirectory from 'find-cache-dir'

- findCacheDirectory({ name: 'foo' })
+ pkg.cache('foo')
```
