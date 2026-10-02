---
description: Modern alternatives to the pako package for zlib, deflate and gzip compression
---

# Replacements for `pako`

`pako` is a JavaScript port of zlib. Its install size is about 2.5 MB, and most of what it does is now available as a smaller package or built into the runtime.

## `fflate`

[`fflate`](https://github.com/101arrowz/fflate) is a much smaller and faster pure JavaScript implementation with synchronous functions close to `pako`'s.

Be careful with the names: `pako.deflate` produces the zlib format, which is `zlibSync` in `fflate`. `fflate`'s `deflateSync` is raw deflate, the same as `pako.deflateRaw`.

| `pako`                      | `fflate`                      |
| --------------------------- | ----------------------------- |
| `deflate` / `inflate`       | `zlibSync` / `unzlibSync`     |
| `deflateRaw` / `inflateRaw` | `deflateSync` / `inflateSync` |
| `gzip` / `ungzip`           | `gzipSync` / `gunzipSync`     |

`pako.inflate` also accepts gzip input. If you relied on that, use `decompressSync`, which detects zlib, gzip and raw deflate.

```ts
import * as pako from 'pako' // [!code --]
import { zlibSync, unzlibSync } from 'fflate' // [!code ++]

const compressed = pako.deflate(data) // [!code --]
const compressed = zlibSync(data) // [!code ++]

const restored = pako.inflate(compressed) // [!code --]
const restored = unzlibSync(compressed) // [!code ++]
```

`pako` 2's `{ to: 'string' }` option has no counterpart (it was also removed in `pako` 3). Decode the bytes with `strFromU8` from `fflate` or with `TextDecoder`.

## `node:zlib` (native, Node.js built-in)

Node ships zlib as [`node:zlib`](https://nodejs.org/api/zlib.html), with the same formats under the same names: `deflateSync` / `inflateSync` for zlib, `deflateRawSync` / `inflateRawSync` for raw deflate and `gzipSync` / `gunzipSync` for gzip. Asynchronous and streaming versions are also available.

```ts
import * as pako from 'pako' // [!code --]
import { deflateSync, inflateSync } from 'node:zlib' // [!code ++]

const compressed = pako.deflate(data) // [!code --]
const compressed = deflateSync(data) // [!code ++]

const restored = pako.inflate(compressed) // [!code --]
const restored = inflateSync(compressed) // [!code ++]
```

## Compression Streams API (native)

[`CompressionStream` and `DecompressionStream`](https://developer.mozilla.org/docs/Web/API/Compression_Streams_API) are available in all modern browsers and as globals in Node 18 and later. The `'deflate'`, `'deflate-raw'` and `'gzip'` formats match `pako.deflate`, `pako.deflateRaw` and `pako.gzip`. The API is stream-based and asynchronous, so it fits best where you already work with streams or `await`.

```ts
import * as pako from 'pako' // [!code --]

const compressed = pako.gzip(data) // [!code --]
const compressed = new Uint8Array( // [!code ++]
  await new Response( // [!code ++]
    new Blob([data]).stream().pipeThrough(new CompressionStream('gzip')) // [!code ++]
  ).arrayBuffer() // [!code ++]
) // [!code ++]
```
