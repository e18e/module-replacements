---
description: Native Node.js alternatives to the buffer-equals package for buffer equality checks
---

# Replacements for `buffer-equals`

## `Buffer#equals` (native)

Buffers have an [`equals`](https://nodejs.org/api/buffer.html#bufequalsotherbuffer) method since Node v0.12.

Example:

```ts
import { Buffer } from 'node:buffer'
import bufferEquals from 'buffer-equals' // [!code --]

const buf1 = Buffer.from('303')
const buf2 = Buffer.from('303')

bufferEquals(buf1, buf2) // [!code --]
buf1.equals(buf2) // [!code ++]
```
