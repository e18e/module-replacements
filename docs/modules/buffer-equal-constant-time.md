---
description: Native Node.js alternatives to the buffer-equal-constant-time package for safe buffer equality checks
---

# Replacements for `buffer-equal-constant-time`

## `crypto.timingSafeEqual` (native)

You can use the [`timingSafeEqual`](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b) function from the `node:crypto` module.

Example:

```diff
  import { Buffer } from 'node:buffer'
- import bufferEqual from 'buffer-equal-constant-time'
+ import * as crypto from 'node:crypto'

  const bufUser = Buffer.from('303')
  const bufSecret = Buffer.from('303')

- bufferEqual(bufUser, bufSecret)
+ bufUser.length === bufSecret.length
+   ? crypto.timingSafeEqual(bufUser, bufSecret)
+   : !crypto.timingSafeEqual(bufUser, bufUser)
```
