---
description: Modern alternatives to the `crypto-js` package for cryptographic operations
---

# Replacements for `crypto-js`

**Motivation:** `crypto-js` is no longer actively maintained and has been discontinued since engines now come with this functionality built-in.

## `node:crypto` (native, Node.js built-in)

Node provides a [`node:crypto`](https://nodejs.org/api/crypto.html) module as part of its standard library.

This supports hashes/HMAC, AES-GCM, PBKDF2/scrypt, RSA/ECDSA/Ed25519, and secure RNG.

```ts
import sha256 from 'crypto-js/sha256' // [!code --]
import { createHash } from 'node:crypto' // [!code ++]

const secret = 'abcdefg'
const hash = sha256(secret).toString() // [!code --]
const hash = createHash('sha256') // [!code ++]
  .update(secret) // [!code ++]
  .digest('hex') // [!code ++]
```

## Web Crypto API (native)

The [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) provides native functionality for cryptographic operations in both web browsers and Node.

> [!NOTE]
> A few legacy algorithms are intentionally omitted for security reasons (e.g. MD5).

## Bun (built-in)

Bun supports the Web Crypto API natively, and also provides support for streaming hashing via [`Bun.CryptoHasher`](https://bun.sh/docs/api/hashing).

As with the Web Crypto API, many legacy algorithms are intentionally omitted for security reasons (e.g. MD5).
