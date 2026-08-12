---
description: Native Web Crypto alternatives to tweetnacl for signatures, key exchange, hashing, and random bytes
---

# Replacements for `tweetnacl`

The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) natively supports most of the primitives implemented by `tweetnacl`: Ed25519 signatures (`nacl.sign.detached`), X25519 key exchange (`nacl.scalarMult`), SHA-512 hashing (`nacl.hash`), and random bytes (`nacl.randomBytes`).

Two differences to keep in mind when migrating:

- Web Crypto is asynchronous (`await`), while `tweetnacl` is synchronous.
- Ed25519 and X25519 support in Web Crypto is a recent addition across browsers, so older engines may need a fallback.

## Signatures (Ed25519)

`nacl.sign.detached` and `nacl.sign.detached.verify` map to `crypto.subtle.sign` and `crypto.subtle.verify` with the `Ed25519` algorithm. Raw public keys can be imported directly with `crypto.subtle.importKey`.

Verifying a signature:

<!-- prettier-ignore -->
```ts
import nacl from 'tweetnacl' // [!code --]

const isVerified = nacl.sign.detached.verify(message, sig, pubKey) // [!code --]
const publicKey = await crypto.subtle.importKey( // [!code ++]
  'raw', // [!code ++]
  pubKey, // [!code ++]
  { name: 'Ed25519' }, // [!code ++]
  false, // [!code ++]
  ['verify'] // [!code ++]
) // [!code ++]
const isVerified = await crypto.subtle.verify( // [!code ++]
  { name: 'Ed25519' }, // [!code ++]
  publicKey, // [!code ++]
  sig, // [!code ++]
  message // [!code ++]
) // [!code ++]
```

Signing a message:

<!-- prettier-ignore -->
```ts
import nacl from 'tweetnacl' // [!code --]

const keyPair = nacl.sign.keyPair() // [!code --]
const sig = nacl.sign.detached(message, keyPair.secretKey) // [!code --]
const keyPair = await crypto.subtle.generateKey( // [!code ++]
  { name: 'Ed25519' }, // [!code ++]
  false, // [!code ++]
  ['sign', 'verify'] // [!code ++]
) // [!code ++]
const sig = new Uint8Array( // [!code ++]
  await crypto.subtle.sign({ name: 'Ed25519' }, keyPair.privateKey, message) // [!code ++]
) // [!code ++]
```

Note that `nacl.sign` (which prepends the signature to the message) has no direct equivalent; use detached signatures and concatenate manually if needed.

## Key exchange (X25519)

`nacl.scalarMult` maps to `crypto.subtle.deriveBits` with the `X25519` algorithm:

<!-- prettier-ignore -->
```ts
import nacl from 'tweetnacl' // [!code --]

const sharedSecret = nacl.scalarMult(mySecretKey, theirPublicKey) // [!code --]
const publicKey = await crypto.subtle.importKey( // [!code ++]
  'raw', // [!code ++]
  theirPublicKey, // [!code ++]
  { name: 'X25519' }, // [!code ++]
  false, // [!code ++]
  [] // [!code ++]
) // [!code ++]
const sharedSecret = new Uint8Array( // [!code ++]
  await crypto.subtle.deriveBits( // [!code ++]
    { name: 'X25519', public: publicKey }, // [!code ++]
    myPrivateKey, // [!code ++]
    256 // [!code ++]
  ) // [!code ++]
) // [!code ++]
```

## Hashing (SHA-512)

`nacl.hash` maps to `crypto.subtle.digest`:

```ts
import nacl from 'tweetnacl' // [!code --]

const hash = nacl.hash(data) // [!code --]
const hash = new Uint8Array(await crypto.subtle.digest('SHA-512', data)) // [!code ++]
```

## Random bytes

`nacl.randomBytes` maps to `crypto.getRandomValues`:

```ts
import nacl from 'tweetnacl' // [!code --]

const bytes = nacl.randomBytes(32) // [!code --]
const bytes = crypto.getRandomValues(new Uint8Array(32)) // [!code ++]
```

## Not covered: `nacl.secretbox` and `nacl.box`

XSalsa20-Poly1305 authenticated encryption (`nacl.secretbox`, `nacl.box`) has no Web Crypto equivalent. Code using these primitives cannot migrate to native APIs and should keep using `tweetnacl` or a maintained alternative implementing the same construction.
