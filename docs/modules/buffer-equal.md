---
description: Native Node.js alternatives to the buffer-equal package for buffer equality checks
---

# Replacements for `buffer-equal`

## `Buffer#equals` (native)

Buffers have an `equals` method since Node 0.12.

Example:

```diff
  import { Buffer } from 'node:buffer'
- import bufferEqual from 'buffer-equal'

  const buf1 = Buffer.from('303')
  const buf2 = Buffer.from('303')

- bufferEqual(buf1, buf2)
+ buf1.equals(buf2)
```
