---
description: Native alternatives to the pbkdf2 package for secure, iterative password-based key derivation
---

# Replacements for `pbkdf2`

## `crypto.subtle.deriveBits` (native)

From [`MDN documentation`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#pbkdf2):

```ts
async function deriveKey(password: string, salt: Uint8Array) {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-512' },
    keyMaterial,
    256
  )
  return new Uint8Array(derivedBits)
}

const salt = crypto.getRandomValues(new Uint8Array(16))
const derivedKey = await deriveKey('password', salt)
```

## `crypto.pbkdf2` (native, since Node.js v0.5.5)

<!-- prettier-ignore -->
```ts
import pbkdf2 from 'pbkdf2' // [!code --]
import * as crypto from 'node:crypto' // [!code ++]

const salt = crypto.getRandomValues(new Uint8Array(16))
const iterations = 100000
const keylen = 32

const derivedKey = pbkdf2.pbkdf2Sync('password', salt, iterations, keylen, 'sha512') // [!code --]
const derivedKey = crypto.pbkdf2Sync('password', salt, iterations, keylen, 'sha512') // [!code ++]
```
