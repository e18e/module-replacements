---
description: Modern alternatives to the jsonwebtoken package for JWT signing and verification
---

# Replacements for `jsonwebtoken`

## `jose`

[`jose`](https://github.com/panva/jose) implements the full JOSE standard (JWK, JWS, JWE, JWT, JWKS) using the Web Crypto API

Compared to `jsonwebtoken`, it works everywhere globalThis.crypto is available: Node.js 18+, Deno, Bun, Cloudflare Workers, and browsers.

```ts
import jwt from 'jsonwebtoken' // [!code --]
import { SignJWT, jwtVerify } from 'jose' // [!code ++]

const secret = 'mysecretkey'
const payload = { userId: 123 }

const token = jwt.sign(payload, secret, { expiresIn: '1h' }) // [!code --]
const decoded = jwt.verify(token, secret) // [!code --]

const joseSecret = new TextEncoder().encode(secret) // [!code ++]

const token = await new SignJWT(payload) // [!code ++]
  .setProtectedHeader({ alg: 'HS256' }) // [!code ++]
  .setExpirationTime('1h') // [!code ++]
  .sign(joseSecret) // [!code ++]

const { payload: decoded } = await jwtVerify(token, joseSecret) // [!code ++]
```
