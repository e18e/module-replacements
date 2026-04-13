---
description: Modern alternatives to the fs-extra package for working with the file system
---

# Replacements for `fs-extra`

## `fs` and `fs/promises` (native, Node.js)

Modern Node.js includes built-in `fs` and `fs/promises` APIs that cover what [`fs-extra`](https://github.com/jprichardson/node-fs-extra) historically provided.

```diff
- import fsExtra from 'fs-extra'
+ import * as fs from 'node:fs'
+ import * as fsPromises from 'node:fs/promises'
```

### `copy`

```diff
- await fsExtra.copy(src, dest)
+ await fsPromises.cp(src, dest, { recursive: true })
```

> [!NOTE]
> If src is a file and dest is an existing directory, `fs-extra` throws; `fs.cp` copies into the directory.

### `copySync`

```diff
- fsExtra.copySync(src, dest)
+ fs.cpSync(src, dest, { recursive: true })
```

### `remove`

```diff
- await fsExtra.remove(path)
+ await fsPromises.rm(path, { recursive: true, force: true })
```

> [!IMPORTANT]
> Remember to set `{ recursive: true, force: true }` to match the behavior of `fs-extra`.

```diff
- fsExtra.removeSync(path)
+ fs.rmSync(path, { recursive: true, force: true })
```

### `mkdirs` / `mkdirp` / `ensureDir`

```diff
- await fsExtra.mkdirs(dir)
+ await fsPromises.mkdir(dir, { recursive: true })
```

### `mkdirsSync` / `mkdirpSync` / `ensureDirSync`

```diff
- fsExtra.mkdirsSync(dir)
+ fs.mkdirSync(dir, { recursive: true })
```

### `pathExists`

<!-- prettier-ignore -->
```diff
- await fsExtra.pathExists(path)
+ await fsPromises.access(path).then(() => true, () => false)
```

### `pathExistsSync`

```diff
- fsExtra.pathExistsSync(path)
+ fs.existsSync(path)
```

### `outputFile`

```diff
- await fsExtra.outputFile(file, data)

+ await fsPromises.mkdir(path.dirname(file), { recursive: true })
+ await fsPromises.writeFile(file, data)
```

### `outputFileSync`

```diff
- fsExtra.outputFileSync(file, data)

+ fs.mkdirSync(path.dirname(file), { recursive: true })
+ fs.writeFileSync(file, data)
```

### `readJson`

```diff
- await fsExtra.readJson(file)
+ await fsPromises.readFile(file, 'utf8').then(JSON.parse)
```

### `writeJson` / `outputJson`

```diff
- await fsExtra.writeJson(file, obj)

+ await fsPromises.mkdir(path.dirname(file), { recursive: true })
+ await fsPromises.writeFile(file, JSON.stringify(obj, null, 2))
```

### `ensureFile` / `createFile`

```diff
- await fsExtra.ensureFile(file)

+ await fsPromises.mkdir(path.dirname(file), { recursive: true })
+ await fsPromises.access(file).catch(() => fsPromises.writeFile(file, ''))
```

### `ensureFileSync` / `createFileSync`

```diff
- fsExtra.ensureFileSync(file)

+ fs.mkdirSync(path.dirname(file), { recursive: true })
+ fs.writeFileSync(file, '')
```

### `ensureLink` / `createLink`

```diff
- await fsExtra.ensureLink(src, dest)

+ await fsPromises.mkdir(path.dirname(dest), { recursive: true })
+ await fsPromises.link(src, dest)
```

### `ensureLinkSync` / `createLinkSync`

```diff
- fsExtra.ensureLinkSync(src, dest)
+ fs.mkdirSync(path.dirname(dest), { recursive: true })
+ fs.linkSync(src, dest)
```

### `ensureSymlink` / `createSymlink`

```diff
- await fsExtra.ensureSymlink(src, dest)

+ await fsPromises.mkdir(path.dirname(dest), { recursive: true })
+ await fsPromises.symlink(src, dest)
```

### `ensureSymlinkSync` / `createSymlinkSync`

```diff
- fsExtra.ensureSymlinkSync(src, dest)

+ fs.mkdirSync(path.dirname(dest), { recursive: true })
+ fs.symlinkSync(src, dest)
```

### `emptyDir` / `emptydir`

```diff
- await fsExtra.emptyDir(dir)

+ await fsPromises.rm(dir, { recursive: true, force: true })
+ await fsPromises.mkdir(dir, { recursive: true })
```

### `move`

```diff
- await fsExtra.move(src, dest)
+ await fsPromises.rename(src, dest)
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
