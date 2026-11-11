---
description: Modern alternatives to the bcrypt package for password hashing
---

# Replacements for `bcrypt`

**Motivation:** The `bcrypt` package can be replaced by native functionality in most runtimes, or more performant packages.

## `bcryptjs`

[`bcryptjs`](https://github.com/dcodeIO/bcrypt.js) is a widely used pure JavaScript implementation with a very similar API surface to `bcrypt`.

```ts
import bcrypt from 'bcrypt' // [!code --]
import bcrypt from 'bcryptjs' // [!code ++]

const salt = await bcrypt.genSalt(10)

const hash = await bcrypt.hash('password', salt)
```

## `node:crypto` (native, Node.js built-in)

Node provides [`node:crypto`](https://nodejs.org/api/crypto.html) for secure password hashing primitives (for example `scrypt` and `pbkdf2`). This is not a drop-in `bcrypt` API replacement, but is a good option if you can switch to a more secure cryptographic algorithm it supports.

## Web Crypto API (native)

The [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) provides native functionality for cryptographic operations in both web browsers and Node.

> [!NOTE]
> A few legacy algorithms are intentionally omitted for security reasons (e.g. MD5).

## Bun (built-in)

Bun supports the Web Crypto API natively, and also provides support for streaming hashing via [`Bun.CryptoHasher`](https://bun.sh/docs/api/hashing).

As with the Web Crypto API, many legacy algorithms are intentionally omitted for security reasons (e.g. MD5).
