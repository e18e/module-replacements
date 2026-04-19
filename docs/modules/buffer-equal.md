---
description: Native Node.js alternatives to the buffer-equal package for buffer equality checks
---

# Replacements for `buffer-equal`

## `Buffer#equals` (native)

Buffers have an [`equals`](https://nodejs.org/api/buffer.html#bufequalsotherbuffer) method since Node v0.12.

Example:

```ts
import { Buffer } from 'node:buffer'
import bufferEqual from 'buffer-equal' // [!code --]

const buf1 = Buffer.from('303')
const buf2 = Buffer.from('303')

bufferEqual(buf1, buf2) // [!code --]
buf1.equals(buf2) // [!code ++]
```
