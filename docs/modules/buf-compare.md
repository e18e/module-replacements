---
description: Native Node.js alternatives to the buf-compare package for buffer comparison
---

# Replacements for `buf-compare`

## `Buffer.compare` (native)

[`Buffer.compare`](https://nodejs.org/api/buffer.html#static-method-buffercomparebuf1-buf2) is a native method which achieves the same result as `buf-compare`, available since Node v0.11.13.

Example:

```ts
import { Buffer } from 'node:buffer'
import bufCompare from 'buf-compare' // [!code --]

const buf1 = Buffer.from('303')
const buf2 = Buffer.from('808')

bufCompare(buf1, buf2) // [!code --]
Buffer.compare(buf1, buf2) // [!code ++]
```
