---
description: Native Node.js alternatives to the rimraf package for recursive directory removal
---

# Replacements for `rimraf`

## `fs.rm` (native, Node.js)

Node.js v14.14.0 and above provide a native alternative: [`fs.rm`](https://nodejs.org/api/fs.html#fspromisesrmpath-options) and [`fs.rmSync`](https://nodejs.org/api/fs.html#fsrmsyncpath-options). It supports recursive deletion and works as a direct replacement.

### Async methods

```ts
import rimraf from 'rimraf' // [!code --]
import { rm } from 'node:fs/promises' // [!code ++]

await rimraf('./dist') // [!code --]
await rm('./dist', { recursive: true, force: true }) // [!code ++]
```

### Sync methods

```ts
import rimraf from 'rimraf' // [!code --]
import * as fs from 'node:fs' // [!code ++]

rimraf.sync('./dist') // [!code --]
fs.rmSync('./dist', { recursive: true, force: true }) // [!code ++]
```

> [!IMPORTANT]
> Remember to set `{ recursive: true, force: true }` to match the behavior of rimraf.

## `fs.rmdir` (native, Node.js before v14.14.0)

If you need to support Node.js 12 up to 14.13, you can use [`fs.rmdir`](https://nodejs.org/api/fs.html#fsrmdirpath-options-callback) with the recursive option. This was added in Node v12.10.0, though it’s deprecated as of Node v14.

```ts
import rimraf from 'rimraf' // [!code --]
import { rmdir } from 'node:fs/promises' // [!code ++]

await rimraf('./dist') // [!code --]
await rmdir('./dist', { recursive: true }) // [!code ++]
```

## CLI usage

To replace `rimraf` inside npm scripts, you can run Node directly in eval mode:

```sh
node -e "require('fs').rmSync('./dist', { recursive: true, force: true, maxRetries: process.platform === 'win32' ? 10 : 0 })"
```

## `premove`

If you are on an older Node.js version (before v12.10) or you specifically need a CLI replacement, you can use [`premove`](https://github.com/lukeed/premove). It provides both an API and a CLI and works on Node.js v8 and newer.

```json
{
  "scripts": {
    "clean": "rimraf lib", // [!code --]
    "clean": "premove lib" // [!code ++]
  }
}
```
