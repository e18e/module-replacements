---
description: Modern alternatives to the through package
---

# Replacements for `through`

## `stream.Writable` (native, Node.js)

The native [`stream.Writable`](https://nodejs.org/api/stream.html#class-streamwritable) class can be used to create writable streams. It is a suitable replacement when `through` is being used only as a sink that consumes data, rather than as a duplex/transform stream that forwards data.

<!-- prettier-ignore -->
```ts
import through from 'through' // [!code --]
import { Writable } from 'node:stream' // [!code ++]

through(fn) // [!code --]
new Writable({ // [!code ++]
  write: (chunk, encoding, callback) => { // [!code ++]
    fn(chunk) // [!code ++]
    callback() // [!code ++]
  } // [!code ++]
}) // [!code ++]
```
