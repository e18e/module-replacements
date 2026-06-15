---
description: Modern alternatives to the cwd package for resolving project-relative paths
---

# Replacements for `cwd`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

[`cwd`](https://github.com/jonschlinkert/cwd) is not `process.cwd()`. It finds the nearest `package.json` and returns an absolute path anchored to that package root. Unlike [`pkg-dir`](./pkg-dir.md), which returns the package root directory, `cwd` returns a resolved path relative to that root.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```ts
import { resolve, dirname } from 'node:path' // [!code ++]
import * as pkg from 'empathic/package' // [!code ++]
import cwd from 'cwd' // [!code --]

const filepath = resolve('one/two.js') // [!code ++]
const pkgPath = pkg.up({ cwd: filepath }) // [!code ++]
const result = cwd('one/two.js') // [!code --]
const result = pkgPath ? resolve(dirname(pkgPath), filepath) : filepath // [!code ++]
```
