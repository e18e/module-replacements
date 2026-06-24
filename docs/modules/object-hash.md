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

## `object-identity`

[`object-identity`](https://github.com/maraisr/object-identity) canonicalizes any value into a stable identity string. It's deep, cycle-safe, and dependency-free, and it's a great fit for deriving a deterministic key or comparing structural equality. For most uses of `object-hash`, it should serve you well.

It returns a stable identity rather than a cryptographic hash. If you specifically need a hash digest, follow one of the examples below.

Example:

```ts
import objectHash from 'object-hash' // [!code --]
import { identify } from 'object-identity' // [!code ++]

const id = objectHash(obj) // [!code --]
const id = identify(obj) // [!code ++]
```

## Web Crypto

Use the standard [`SubtleCrypto.digest`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) available in modern runtimes. Pair it with a stable serializer (e.g., [`safe-stable-stringify`](https://github.com/BridgeAR/safe-stable-stringify), [`object-identity`](https://github.com/maraisr/object-identity)) to ensure deterministic key ordering.

Example:

```ts
import objectHash from 'object-hash' // [!code --]
import { identify } from 'object-identity' // [!code ++]

const h = objectHash(obj, { algorithm: 'sha256' }) // [!code --]
const data = new TextEncoder().encode(identify(obj)) // [!code ++]
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
import { identify } from 'object-identity' // [!code ++]

const h = objectHash(obj, { algorithm: 'sha256' }) // [!code --]
const hasher = new CryptoHasher('sha256') // [!code ++]
hasher.update(identify(obj)) // [!code ++]
const h = hasher.digest('hex') // [!code ++]
```
