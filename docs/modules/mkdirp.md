---
description: Modern alternatives to the mkdirp and make-dir packages for recursively creating directories in Node.js
---

# Replacements for `mkdirp` / `make-dir`

## Recursive `fs.mkdir` (native, since Node.js v10.12.0)

Node.js v10.12.0 and up supports the `recursive` option in the [`fs.mkdir`](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback) function, which allows parent directories to be created automatically.

Example migration from [`mkdirp`](https://github.com/isaacs/node-mkdirp):

```diff
- import { mkdirp } from 'mkdirp'
+ import { mkdir, mkdirSync } from 'node:fs'
+ import { mkdir as mkdirAsync } from 'node:fs/promises'

  // Async
- await mkdirp('/tmp/foo/bar/baz')
+ await mkdirAsync('/tmp/foo/bar/baz', { recursive: true })

  // Sync
- mkdirp.sync('/tmp/foo/bar/baz')
+ mkdirSync('/tmp/foo/bar/baz', { recursive: true })
```

Example migration from [`make-dir`](https://github.com/sindresorhus/make-dir):

```diff
- import { makeDirectory, makeDirectorySync } from 'make-dir'
+ import { mkdir, mkdirSync } from 'node:fs'
+ import { mkdir as mkdirAsync } from 'node:fs/promises'

  // Async
- await makeDirectory('/tmp/foo/bar/baz')
+ await mkdirAsync('/tmp/foo/bar/baz', { recursive: true })

  // Sync
- makeDirectorySync('/tmp/foo/bar/baz')
+ mkdirSync('/tmp/foo/bar/baz', { recursive: true })
```
