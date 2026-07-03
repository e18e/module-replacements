---
description: Lighter alternative to the tar-fs package for packing and extracting tar archives on the filesystem
---

# Replacements for `tar-fs`

## `modern-tar`

[`tar-fs`](https://github.com/mafintosh/tar-fs) provides filesystem bindings on top of [`tar-stream`](https://github.com/mafintosh/tar-stream). [`modern-tar`](https://github.com/ayuhito/modern-tar) covers the same workflows through [`modern-tar/fs`](https://github.com/ayuhito/modern-tar), with zero dependencies and built-in TypeScript types.

Example:

```js
import tar from 'tar-fs' // [!code --]
import { createReadStream, createWriteStream } from 'node:fs' // [!code ++]
import { packTar, unpackTar } from 'modern-tar/fs' // [!code ++]
import { pipeline } from 'node:stream/promises' // [!code ++]

tar.pack('./my-directory').pipe(createWriteStream('my-tarball.tar')) // [!code --]
await pipeline(packTar('./my-directory'), createWriteStream('my-tarball.tar')) // [!code ++]

createReadStream('my-other-tarball.tar').pipe(
  tar.extract('./my-other-directory')
) // [!code --]
await pipeline(
  createReadStream('my-other-tarball.tar'),
  unpackTar('./my-other-directory')
) // [!code ++]
```
