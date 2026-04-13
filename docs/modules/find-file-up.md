---
description: Modern alternatives to the find-file-up package for finding files by walking up parent directories
---

# Replacements for `find-file-up`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```diff
+ import * as find from 'empathic/find'
- import findUp from 'find-file-up'

- await findUp('package.json', cwd)
+ find.file('package.json', { cwd })
```
