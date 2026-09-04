---
description: Native alternatives to the is-utf8 package for checking whether bytes are valid UTF-8
---

# Replacements for `is-utf8`

Both Node.js and the web platform can check for valid UTF-8 without a dependency. The two options below return the same answer, so it is only a question of where the code runs.

One difference to keep in mind: among control characters `is-utf8` accepts only tab, line feed and carriage return, and rejects the other thirty even though all of them are valid UTF-8. If you were relying on that to tell text from binary, keep the check explicit.

## `buffer.isUtf8` (native, since Node.js v19.4.0 / v18.14.0)

[`buffer.isUtf8`](https://nodejs.org/api/buffer.html#bufferisutf8input) takes a `Buffer`, `TypedArray` or `ArrayBuffer`.

```ts
import isUtf8 from 'is-utf8' // [!code --]
import { isUtf8 } from 'node:buffer' // [!code ++]

isUtf8(bytes)
```

## `TextDecoder` (native, browsers and Node.js)

Elsewhere, decode with [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) and `fatal: true`, which throws on malformed input instead of substituting replacement characters.

<!-- prettier-ignore -->
```ts
import isUtf8 from 'is-utf8' // [!code --]
const decoder = new TextDecoder('utf-8', {fatal: true}) // [!code ++]
const isUtf8 = (bytes) => { // [!code ++]
  try { // [!code ++]
    decoder.decode(bytes) // [!code ++]
    return true // [!code ++]
  } catch { // [!code ++]
    return false // [!code ++]
  } // [!code ++]
} // [!code ++]
```
