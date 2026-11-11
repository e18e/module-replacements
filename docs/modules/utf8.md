---
description: Modern alternatives to the utf8 package for UTF-8 encoding and decoding
---

# Replacements for `utf8`

**Motivation:** Modern Node and browsers provide native UTF-8 APIs, so this dependency is rarely needed.

## TextEncoder/TextDecoder (native)

The built-in [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) APIs provide a native way to handle UTF-8 encoding and decoding.

```ts
const text = '€'
const encoder = new TextEncoder()
const utf8Bytes = encoder.encode(text) // Uint8Array of UTF-8 bytes

// and to decode:

const decoder = new TextDecoder('utf-8', { fatal: true })
const decodedText = decoder.decode(utf8Bytes) // "€"
```

## Buffer (native)

Node's built-in [`Buffer`](https://nodejs.org/api/buffer.html) provides both `Buffer.from(str, 'utf8')` and `buf.toString('utf8')` methods for UTF-8 encoding and decoding.

```ts
import { Buffer } from 'node:buffer'

const text = '€'
const utf8Buffer = Buffer.from(text, 'utf8') // Buffer of UTF-8 bytes
```
