---
description: Modern alternatives to the duplexer package
---

# Replacements for `duplexer`

## `Duplex.from` (native, Node.js)

<!-- prettier-ignore -->
```js
import duplexer from 'duplexer' // [!code --]
import { Duplex } from 'node:stream' // [!code ++]

duplexer(writableStream, readableStream) // [!code --]

Duplex.from({ // [!code ++]
  writable: writableStream, // [!code ++]
  readable: readableStream // [!code ++]
}) // [!code ++]
```
