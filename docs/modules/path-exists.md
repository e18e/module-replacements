---
description: Modern alternatives to the path-exists package for checking if a path exists
---

# Replacements for `path-exists`

## Async `fs.access` (native, Node.js)

Use [`fs/promises.access`](https://nodejs.org/docs/latest/api/fs.html#fspromisesaccesspath-mode) and return a boolean.

<!-- prettier-ignore -->
```diff
- import pathExists from 'path-exists'
+ import { access } from 'node:fs/promises'
  
- const exists = await pathExists('/etc/passwd')
+ const exists = await access('/etc/passwd').then(
+   () => true,
+   () => false
+ )
```

## Sync `fs.existsSync` (native, Node.js)

Added in v0.1.21: synchronous path/file existence check via [`fs.existsSync`](https://nodejs.org/docs/latest/api/fs.html#fsexistssyncpath).

```diff
- import pathExists from 'path-exists'
+ import { existsSync } from 'node:fs'

- const exists = await pathExists('/etc/passwd')
+ const exists = existsSync('/etc/passwd')
```

## Bun

[`Bun.file()`](https://bun.sh/reference/bun/BunFile) returns a BunFile with an `.exists()` method.

```diff
- import pathExists from 'path-exists'

  const path = '/path/to/package.json'
- const exists = await pathExists(path)
+ const file = Bun.file(path)
+ const exists = await file.exists() // boolean
```
