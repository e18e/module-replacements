---
description: Modern alternatives to the jszip package for creating and reading ZIP files
---

# Replacements for `jszip`

`jszip` creates and reads ZIP archives. Its dependencies are dated: it still pulls in `pako` 1, `readable-stream` 2 and the `lie` (Promise) and `setimmediate` polyfills.

## `fflate`

[`fflate`](https://github.com/101arrowz/fflate) has no dependencies and can create and read ZIP archives synchronously or asynchronously. Instead of a `JSZip` object, an archive is a plain object that maps file names to `Uint8Array` contents. Nested objects become folders.

Creating an archive:

```ts
import JSZip from 'jszip' // [!code --]
import { zipSync, strToU8 } from 'fflate' // [!code ++]

const zip = new JSZip() // [!code --]
zip.file('hello.txt', 'Hello World') // [!code --]
zip.folder('images').file('pixel.png', pixel) // [!code --]
const bytes = await zip.generateAsync({ type: 'uint8array' }) // [!code --]
const hello = strToU8('Hello World') // [!code ++]
const bytes = zipSync({ 'hello.txt': hello, images: { 'pixel.png': pixel } }) // [!code ++]
```

Reading an archive:

```ts
import JSZip from 'jszip' // [!code --]
import { unzipSync, strFromU8 } from 'fflate' // [!code ++]

const zip = await JSZip.loadAsync(bytes) // [!code --]
const text = await zip.file('hello.txt').async('string') // [!code --]
const files = unzipSync(bytes) // [!code ++]
const text = strFromU8(files['hello.txt']) // [!code ++]
```

Folder entries show up in `unzipSync` results as empty files whose names end in `/`, like `jszip`'s `files` keys. To extract only some files, pass a `filter` option, for example `unzipSync(bytes, { filter: (file) => file.name.endsWith('.txt') })`.

`jszip` stores files without compression unless you pass `compression: 'DEFLATE'`, while `fflate` compresses at level 6 by default. Pass `{ level: 0 }` to store files uncompressed.

`zip` and `unzip` are the asynchronous versions. They take a callback and run the work in a Web or Node worker, which adds some startup overhead, so they pay off for larger archives. For `type: 'blob'` or `type: 'nodebuffer'` output, wrap the bytes with `new Blob([bytes])` or `Buffer.from(bytes)`.
