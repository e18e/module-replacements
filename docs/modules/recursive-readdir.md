---
description: Modern alternatives to the recursive-readdir, fs-readdir-recursive and klaw-sync packages for recursively listing files in Node.js
---

# Replacements for `recursive-readdir` / `fs-readdir-recursive` / `klaw-sync`

Node.js can now list directories recursively on its own, so these packages are no longer needed

## Recursive `fs.readdir` (native, since Node.js v20.1.0 and v18.17.0)

Node.js supports the `recursive` option in [`fs.readdir`](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options) and [`fs.readdirSync`](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options), which lists every file and directory under a path.

Without `withFileTypes`, it returns paths relative to the directory you pass in, including directories. With `withFileTypes: true`, it returns [`fs.Dirent`](https://nodejs.org/api/fs.html#class-fsdirent) objects, so you can filter out directories and build full paths from [`dirent.parentPath`](https://nodejs.org/api/fs.html#direntparentpath) (available since Node.js v20.12.0 and v18.20.0).

Results are not guaranteed to be in any particular order, so sort them if you rely on ordering.

Symbolic links are returned as their own entries. If you only want regular files, filter with `dirent.isFile()` instead of `!dirent.isDirectory()`.

Example migration from [`recursive-readdir`](https://github.com/jergason/recursive-readdir):

```ts
import recursiveReaddir from 'recursive-readdir' // [!code --]
import { readdir } from 'node:fs/promises' // [!code ++]
import { join } from 'node:path' // [!code ++]

const files = await recursiveReaddir('src') // [!code --]
const entries = await readdir('src', { recursive: true, withFileTypes: true }) // [!code ++]
const files = entries // [!code ++]
  .filter((entry) => !entry.isDirectory()) // [!code ++]
  .map((entry) => join(entry.parentPath, entry.name)) // [!code ++]
```

The `ignores` argument can be replaced with a filter. For glob patterns, you can use [`path.matchesGlob`](https://nodejs.org/api/path.html#pathmatchesglobpath-pattern) (available since Node.js v22.5.0 and v20.17.0):

```ts
import recursiveReaddir from 'recursive-readdir' // [!code --]
import { readdir } from 'node:fs/promises' // [!code ++]
import { join, matchesGlob, sep } from 'node:path' // [!code ++]

const files = await recursiveReaddir('src', ['*.test.js', 'node_modules']) // [!code --]
const entries = await readdir('src', { recursive: true, withFileTypes: true }) // [!code ++]
const files = entries // [!code ++]
  .filter((entry) => !entry.isDirectory()) // [!code ++]
  .map((entry) => join(entry.parentPath, entry.name)) // [!code ++]
  .filter((file) => !matchesGlob(file, '**/*.test.js')) // [!code ++]
  .filter((file) => !file.split(sep).includes('node_modules')) // [!code ++]
```

Example migration from [`fs-readdir-recursive`](https://github.com/fs-utils/fs-readdir-recursive), which returns paths relative to the root directory and skips dotfiles by default:

```ts
import read from 'fs-readdir-recursive' // [!code --]
import { readdirSync } from 'node:fs' // [!code ++]
import { join, relative, sep } from 'node:path' // [!code ++]

const files = read('src') // [!code --]
const files = readdirSync('src', { recursive: true, withFileTypes: true }) // [!code ++]
  .filter((entry) => !entry.isDirectory()) // [!code ++]
  .map((entry) => relative('src', join(entry.parentPath, entry.name))) // [!code ++]
  .filter((file) => !file.split(sep).some((part) => part.startsWith('.'))) // [!code ++]
```

If you passed a custom filter to include dotfiles, drop the last `.filter()` call.

Example migration from [`klaw-sync`](https://github.com/manidlou/node-klaw-sync), which returns absolute paths together with their `lstat` results:

```ts
import klawSync from 'klaw-sync' // [!code --]
import { lstatSync, readdirSync } from 'node:fs' // [!code ++]
import { join, resolve } from 'node:path' // [!code ++]

const items = klawSync('src') // [!code --]
const dir = resolve('src') // [!code ++]
const items = readdirSync(dir, { recursive: true, withFileTypes: true }) // [!code ++]
  .map((entry) => join(entry.parentPath, entry.name)) // [!code ++]
  .map((path) => ({ path, stats: lstatSync(path) })) // [!code ++]
```

The `nodir` and `nofile` options can be replaced by filtering on `entry.isDirectory()` before mapping, and you can skip the `lstatSync` call entirely if you only need the paths:

```ts
import klawSync from 'klaw-sync' // [!code --]
import { readdirSync } from 'node:fs' // [!code ++]
import { join, resolve } from 'node:path' // [!code ++]

const files = klawSync('src', { nodir: true }).map((item) => item.path) // [!code --]
const dir = resolve('src') // [!code ++]
const files = readdirSync(dir, { recursive: true, withFileTypes: true }) // [!code ++]
  .filter((entry) => !entry.isDirectory()) // [!code ++]
  .map((entry) => join(entry.parentPath, entry.name)) // [!code ++]
```
