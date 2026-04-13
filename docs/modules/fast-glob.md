---
description: Modern alternatives to the fast-glob package for fast file system pattern matching
---

# Replacements for `fast-glob`

## `tinyglobby`

[`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby) is a modern, lightweight alternative that provides similar functionality with better performance.

Example:

<!-- eslint-skip -->

```diff
- import fg from 'fast-glob'
+ import { glob } from 'tinyglobby'

- const files = await fg('**/*.ts', {
+ const files = await glob('**/*.ts', {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**'],
+   expandDirectories: false
  })
```

Most options from `fast-glob` have direct equivalents in `tinyglobby`. Check the [tinyglobby documentation](https://superchupu.dev/tinyglobby/migration) for the complete list of supported options.
