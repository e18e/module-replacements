---
description: Modern alternatives to the path-exists package for checking if a path exists
---

# Replacements for `path-exists`

## `fs.access` and `fs.promises.access` (native, Node.js)

Use [`fs.promises.access`](https://nodejs.org/docs/latest/api/fs.html#fspromisesaccesspath-mode) and return a boolean.

<!-- prettier-ignore -->
```ts
import pathExists from 'path-exists' // [!code --]
import { access } from 'node:fs/promises' // [!code ++]

const exists = await pathExists('/etc/passwd') // [!code --]
const exists = await access('/etc/passwd').then( // [!code ++]
  () => true, // [!code ++]
  () => false // [!code ++]
) // [!code ++]
```

## Sync `fs.existsSync` (native, Node.js)

Added in v0.1.21: synchronous path/file existence check via [`fs.existsSync`](https://nodejs.org/docs/latest/api/fs.html#fsexistssyncpath).

```ts
import pathExists from 'path-exists' // [!code --]
import { existsSync } from 'node:fs' // [!code ++]

const exists = await pathExists('/etc/passwd') // [!code --]
const exists = existsSync('/etc/passwd') // [!code ++]
```

## Bun

[`Bun.file()`](https://bun.sh/reference/bun/BunFile) returns a BunFile with an `.exists()` method.

```ts
import pathExists from 'path-exists' // [!code --]

const path = '/path/to/package.json'
const exists = await pathExists(path) // [!code --]
const file = Bun.file(path) // [!code ++]
const exists = await file.exists() // boolean [!code ++]
```
