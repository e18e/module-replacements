---
description: Modern alternatives to object-hash for hashing objects and values
---

# Replacements for `object-hash`

## `ohash`

[`ohash`](https://github.com/unjs/ohash) is actively maintained and provides hashing, stable serialization, equality checks, and diffs. It uses stable serialization + SHA-256, returning Base64URL by default. Its serializer was originally based on `object-hash`.

Example:

```ts
import objectHash from 'object-hash' // [!code --]
import { hash } from 'ohash' // [!code ++]

const h = objectHash(obj) // [!code --]
const h = hash(obj) // [!code ++]
```

## Web Crypto

Use the standard [`SubtleCrypto.digest`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) available in modern runtimes. Pair it with a stable serializer (e.g., [`safe-stable-stringify`](https://github.com/BridgeAR/safe-stable-stringify)) to ensure deterministic key ordering.

Example:

```ts
import objectHash from 'object-hash' // [!code --]
import stringify from 'safe-stable-stringify' // [!code ++]

const h = objectHash(obj, { algorithm: 'sha256' }) // [!code --]
const data = new TextEncoder().encode(stringify(obj)) // [!code ++]
const buf = await crypto.subtle.digest('SHA-256', data) // [!code ++]
const h = Array.from(new Uint8Array(buf)) // [!code ++]
  .map((b) => b.toString(16).padStart(2, '0')) // [!code ++]
  .join('') // [!code ++]
```

## Bun `CryptoHasher`

Bun provides a native incremental hasher (e.g., SHA-256). Combine it with a stable serializer for object hashing. For fast non-crypto fingerprints, see [`Bun.hash`](https://bun.com/reference/bun/hash).

Docs: https://bun.com/reference/bun/CryptoHasher

Example:

```ts
import objectHash from 'object-hash' // [!code --]
import stringify from 'safe-stable-stringify' // [!code ++]

const h = objectHash(obj, { algorithm: 'sha256' }) // [!code --]
const hasher = new CryptoHasher('sha256') // [!code ++]
hasher.update(stringify(obj)) // [!code ++]
const h = hasher.digest('hex') // [!code ++]
```
