---
description: Native Node.js alternatives to the rimraf package for recursive directory removal
---

# Replacements for `rimraf`

## `fs.rm` (native, Node.js)

Node.js v14.14.0 and above provide a native alternative: [`fs.rm`](https://nodejs.org/api/fs.html#fspromisesrmpath-options) and [`fs.rmSync`](https://nodejs.org/api/fs.html#fsrmsyncpath-options). It supports recursive deletion and works as a direct replacement.

### Async methods

```diff
- import rimraf from 'rimraf'
+ import { rm } from 'node:fs/promises'

- await rimraf('./dist')
+ await rm('./dist', { recursive: true, force: true })
```

### Sync methods

```diff
- import rimraf from 'rimraf'
+ import * as fs from 'node:fs'

- rimraf.sync('./dist')
+ fs.rmSync('./dist', { recursive: true, force: true })
```

> [!IMPORTANT]
> Remember to set `{ recursive: true, force: true }` to match the behavior of rimraf.

## `fs.rmdir` (native, Node.js before v14.14.0)

If you need to support Node.js 12 up to 14.13, you can use [`fs.rmdir`](https://nodejs.org/api/fs.html#fsrmdirpath-options-callback) with the recursive option. This was added in Node v12.10.0, though it’s deprecated as of Node v14.

```diff
- import rimraf from 'rimraf'
+ import { rmdir } from 'node:fs/promises'

- await rimraf('./dist')
+ await rmdir('./dist', { recursive: true })
```

## CLI usage

To replace `rimraf` inside npm scripts, you can run Node directly in eval mode:

```sh
node -e "require('fs').rmSync('./dist', { recursive: true, force: true, maxRetries: process.platform === 'win32' ? 10 : 0 })"
```

## `premove`

If you are on an older Node.js version (before v12.10) or you specifically need a CLI replacement, you can use [`premove`](https://github.com/lukeed/premove). It provides both an API and a CLI and works on Node.js v8 and newer.

```diff
  {
    "scripts": {
-     "clean": "rimraf lib",
+     "clean": "premove lib"
    }
  }
```
