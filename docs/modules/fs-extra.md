---
description: Modern alternatives to the fs-extra package for working with the file system
---

# Replacements for `fs-extra`

## `fs` and `fs/promises` (native, Node.js)

Modern Node.js includes built-in [`fs`](https://nodejs.org/api/fs.html) and [`fs/promises`](https://nodejs.org/api/fs.html#promises-api) APIs that cover what [`fs-extra`](https://github.com/jprichardson/node-fs-extra) historically provided.

```js
import fsExtra from 'fs-extra' // [!code --]
import * as fs from 'node:fs' // [!code ++]
import * as fsPromises from 'node:fs/promises' // [!code ++]
```

### `copy`

```js
await fsExtra.copy(src, dest) // [!code --]
await fsPromises.cp(src, dest, { recursive: true }) // [!code ++]
```

> [!NOTE]
> If src is a file and dest is an existing directory, `fs-extra` throws; `fs.cp` copies into the directory.

### `copySync`

```js
fsExtra.copySync(src, dest) // [!code --]
fs.cpSync(src, dest, { recursive: true }) // [!code ++]
```

### `remove`

```js
await fsExtra.remove(path) // [!code --]
await fsPromises.rm(path, { recursive: true, force: true }) // [!code ++]
```

> [!IMPORTANT]
> Remember to set `{ recursive: true, force: true }` to match the behavior of `fs-extra`.

```js
fsExtra.removeSync(path) // [!code --]
fs.rmSync(path, { recursive: true, force: true }) // [!code ++]
```

### `mkdirs` / `mkdirp` / `ensureDir`

```js
await fsExtra.mkdirs(dir) // [!code --]
await fsPromises.mkdir(dir, { recursive: true }) // [!code ++]
```

### `mkdirsSync` / `mkdirpSync` / `ensureDirSync`

```js
fsExtra.mkdirsSync(dir) // [!code --]
fs.mkdirSync(dir, { recursive: true }) // [!code ++]
```

### `pathExists`

<!-- prettier-ignore -->
```js
await fsExtra.pathExists(path) // [!code --]
await fsPromises.access(path).then(() => true, () => false) // [!code ++]
```

### `pathExistsSync`

```js
fsExtra.pathExistsSync(path) // [!code --]
fs.existsSync(path) // [!code ++]
```

### `outputFile`

```js
await fsExtra.outputFile(file, data) // [!code --]

await fsPromises.mkdir(path.dirname(file), { recursive: true }) // [!code ++]
await fsPromises.writeFile(file, data) // [!code ++]
```

### `outputFileSync`

```js
fsExtra.outputFileSync(file, data) // [!code --]

fs.mkdirSync(path.dirname(file), { recursive: true }) // [!code ++]
fs.writeFileSync(file, data) // [!code ++]
```

### `readJson`

```js
await fsExtra.readJson(file) // [!code --]
await fsPromises.readFile(file, 'utf8').then(JSON.parse) // [!code ++]
```

### `writeJson` / `outputJson`

```js
await fsExtra.writeJson(file, obj) // [!code --]

await fsPromises.mkdir(path.dirname(file), { recursive: true }) // [!code ++]
await fsPromises.writeFile(file, JSON.stringify(obj, null, 2)) // [!code ++]
```

### `ensureFile` / `createFile`

```js
await fsExtra.ensureFile(file) // [!code --]

await fsPromises.mkdir(path.dirname(file), { recursive: true }) // [!code ++]
await fsPromises.access(file).catch(() => fsPromises.writeFile(file, '')) // [!code ++]
```

### `ensureFileSync` / `createFileSync`

```js
fsExtra.ensureFileSync(file) // [!code --]

fs.mkdirSync(path.dirname(file), { recursive: true }) // [!code ++]
fs.writeFileSync(file, '') // [!code ++]
```

### `ensureLink` / `createLink`

```js
await fsExtra.ensureLink(src, dest) // [!code --]

await fsPromises.mkdir(path.dirname(dest), { recursive: true }) // [!code ++]
await fsPromises.link(src, dest) // [!code ++]
```

### `ensureLinkSync` / `createLinkSync`

```js
fsExtra.ensureLinkSync(src, dest) // [!code --]
fs.mkdirSync(path.dirname(dest), { recursive: true }) // [!code ++]
fs.linkSync(src, dest) // [!code ++]
```

### `ensureSymlink` / `createSymlink`

```js
await fsExtra.ensureSymlink(src, dest) // [!code --]

await fsPromises.mkdir(path.dirname(dest), { recursive: true }) // [!code ++]
await fsPromises.symlink(src, dest) // [!code ++]
```

### `ensureSymlinkSync` / `createSymlinkSync`

```js
fsExtra.ensureSymlinkSync(src, dest) // [!code --]

fs.mkdirSync(path.dirname(dest), { recursive: true }) // [!code ++]
fs.symlinkSync(src, dest) // [!code ++]
```

### `emptyDir` / `emptydir`

```js
await fsExtra.emptyDir(dir) // [!code --]

await fsPromises.rm(dir, { recursive: true, force: true }) // [!code ++]
await fsPromises.mkdir(dir, { recursive: true }) // [!code ++]
```

### `move`

```js
await fsExtra.move(src, dest) // [!code --]
await fsPromises.rename(src, dest) // [!code ++]
```

> [!NOTE]
> Does not work cross-device; add `cp` + `rm` fallback.

For example:

```js
try {
  await fsPromises.rename(src, dest)
} catch (err) {
  if (err.code === 'EXDEV') {
    await fsPromises.cp(src, dest, { recursive: true })
    await fsPromises.rm(src, { recursive: true, force: true })
  } else {
    throw err
  }
}
```
