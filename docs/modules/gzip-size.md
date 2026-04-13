---
description: Native Node.js alternatives to the gzip-size for calculating gzipped size of a string or buffer
---

# Replacements for `gzip-size`

## `gzipSync` (native, since Node.js 9.4.0)

To calculate the gzipped size of a string or an `ArrayBuffer`, you can use [gzipSync](https://nodejs.org/api/zlib.html#zlibgzipsync) which exist inside the `zlib` module:

### Synchronous

```diff
- import { gzipSizeSync } from 'gzip-size'
+ import { gzipSync } from 'node:zlib'

  const text = 'Lorem ipsum dolor sil amet'

- console.log(gzipSizeSync(text))
+ console.log(gzipSync(text).length)
```

### Asynchronous

```diff
- import { gzipSize } from 'gzip-size'
+ import { gzipSync } from 'node:zlib'
+ import { promisify } from 'node:util'

+ const gzipAsync = promisify(gzip)

  const text = 'Lorem ipsum dolor sil amet'

- console.log(await gzipSize(text))
+ console.log((await gzipAsync(text)).length)
```

### Calculating from a file

```diff
- import { gzipSizeFromFileSync } from 'gzip-size'
+ import { gzipSync } from 'node:zlib'
+ import { readFileSync } from 'node:fs'

  const path = '/path/to/file'

- console.log(gzipSizeFromFileSync(path))
+ console.log(gzipSync(readFileSync(path)).length)
```
