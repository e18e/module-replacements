---
description: Native Node.js alternatives to the buffer-equals package for buffer equality checks
---

# Replacements for `buffer-equals`

## `Buffer#equals` (native)

Buffers have an `equals` method since Node 0.12.

Example:

```diff
  import { Buffer } from 'node:buffer'
- import bufferEquals from 'buffer-equals'

  const buf1 = Buffer.from('303')
  const buf2 = Buffer.from('303')

- bufferEquals(buf1, buf2)
+ buf1.equals(buf2)
```
