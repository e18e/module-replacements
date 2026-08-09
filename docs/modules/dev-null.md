---
description: Modern alternatives to the dev-null package
---

# Replacements for `dev-null`

## `stream.Writable` (native, Node.js)

The native [`stream.Writable`](https://nodejs.org/api/stream.html#class-streamwritable) class can be used to construct a custom writable stream that discards incoming data.

<!-- prettier-ignore -->
```ts
import devnull from 'dev-null' // [!code --]
import { Writable } from 'node:stream' // [!code ++]

stream.pipe(devnull()) // [!code --]

const empty = new Writable({ // [!code ++]
  write(chunk, encoding, callback) { // [!code ++]
    callback() // [!code ++]
  } // [!code ++]
}) // [!code ++]

stream.pipe(empty) // [!code ++]
```
