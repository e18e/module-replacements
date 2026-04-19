---
description: Native Node.js alternatives to the md5 package for MD5 hash generation
---

# Replacements for `md5`

## `crypto` (native)

If you're using the [`md5`](https://github.com/pvorb/node-md5) package, _strongly_ consider moving to a stronger algorithm if your usage is security-sensitive (for example, passwords). MD5 is [not secure](https://en.wikipedia.org/wiki/MD5#Security) and hasn't been secure for many years.

If you must keep MD5 for compatibility, Node.js provides a native alternative via the [`crypto` module](https://nodejs.org/api/crypto.html#crypto).

```ts
import crypto from 'node:crypto' // [!code ++]
import md5 from 'md5' // [!code --]

md5('message') // [!code --]
crypto.createHash('md5').update('message').digest('hex') // [!code ++]
```
