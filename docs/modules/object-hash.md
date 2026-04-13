---
description: Modern alternatives to object-hash for hashing objects and values
---

# Replacements for `object-hash`

## `ohash`

[`ohash`](https://github.com/unjs/ohash) is actively maintained and provides hashing, stable serialization, equality checks, and diffs. It uses stable serialization + SHA-256, returning Base64URL by default. Its serializer was originally based on `object-hash`.

Example:

```diff
- import objectHash from 'object-hash'
+ import { hash } from 'ohash'

- const h = objectHash(obj)
+ const h = hash(obj)
```

## Web Crypto

Use the standard `SubtleCrypto.digest` available in modern runtimes. Pair it with a stable serializer (e.g., [`safe-stable-stringify`](https://github.com/BridgeAR/safe-stable-stringify)) to ensure deterministic key ordering.

Example:

```diff
- import objectHash from 'object-hash'
+ import stringify from 'safe-stable-stringify'

- const h = objectHash(obj, { algorithm: 'sha256' })
+ const data = new TextEncoder().encode(stringify(obj))
+ const buf = await crypto.subtle.digest('SHA-256', data)
+ const h = Array.from(new Uint8Array(buf))
+   .map((b) => b.toString(16).padStart(2, '0'))
+   .join('')
```

## Bun `CryptoHasher`

Bun provides a native incremental hasher (e.g., SHA-256). Combine it with a stable serializer for object hashing. For fast non-crypto fingerprints, see [`Bun.hash`](https://bun.com/reference/bun/hash).

Docs: https://bun.com/reference/bun/CryptoHasher

Example:

```diff
- import objectHash from 'object-hash'
+ import stringify from 'safe-stable-stringify'

- const h = objectHash(obj, { algorithm: 'sha256' })
+ const hasher = new CryptoHasher('sha256')
+ hasher.update(stringify(obj))
+ const h = hasher.digest('hex')
```
