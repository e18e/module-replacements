---
description: Modern alternatives to the jsonwebtoken package for JWT signing and verification
---

# Replacements for `jsonwebtoken`

## `jose`

[`jose`](https://github.com/panva/jose) implements the full JOSE standard (JWK, JWS, JWE, JWT, JWKS) using the Web Crypto API

Compared to `jsonwebtoken`, it works everywhere globalThis.crypto is available: Node.js 18+, Deno, Bun, Cloudflare Workers, and browsers.

```diff
- import jwt from 'jsonwebtoken'
+ import { SignJWT, jwtVerify } from 'jose'

  const secret = 'mysecretkey'
  const payload = { userId: 123 }

- const token = jwt.sign(payload, secret, { expiresIn: '1h' })
- const decoded = jwt.verify(token, secret)

+ const joseSecret = new TextEncoder().encode(secret)

+ const token = await new SignJWT(payload)
+   .setProtectedHeader({ alg: 'HS256' })
+   .setExpirationTime('1h')
+   .sign(joseSecret)

+ const { payload: decoded } = await jwtVerify(token, joseSecret)
```
