---
description: Modern alternatives to the has-yarn package for detecting a yarn.lock file
---

# Replacements for `has-yarn`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a generic way to find files, including searching upwards through parent directories.

Example:

```ts
import hasYarn from 'has-yarn' // [!code --]
import * as find from 'empathic/find' // [!code ++]

hasYarn() // [!code --]
Boolean(find.up('yarn.lock')) // [!code ++]
```

Note that `has-yarn` only checks the given directory (defaulting to `process.cwd()`), while `find.up` walks up parent directories. To match the original behavior exactly, a one-liner with `node:fs` suffices:

```ts
import fs from 'node:fs'
import path from 'node:path'

const hasYarn = (cwd = process.cwd()) =>
  fs.existsSync(path.resolve(cwd, 'yarn.lock'))
```
