---
description: Native alternatives to the uuidv4 package for UUID v4 generation
---

# Replacements for `uuidv4`

## `crypto.randomUUID` (native)

You can use [`crypto.randomUUID`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) for UUID v4 generation.

Example:

```ts
const uuid = crypto.randomUUID()
```

Or in Node.js via [`node:crypto`](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions):

```ts
import * as crypto from 'node:crypto'

const uuid = crypto.randomUUID()
```
