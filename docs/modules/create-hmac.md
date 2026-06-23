---
description: Modern alternatives to the `create-hmac` package for HMAC
---

# Replacements for `create-hmac`

## `crypto.createHmac` (native, Node.js)

```js
import { createHmac } from 'node:crypto' // [!code ++]
import createHmac from 'create-hmac' // [!code --]

const secret = 'secret-key'
const data = 'message-to-sign'

const hash = createHmac('sha256', secret).update(data).digest('hex')
```

## `crypto.subtle.sign` (native, browser)

```js
const encoder = new TextEncoder()

async function generateHMAC(secret, data) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))

  return new Uint8Array(signature).toHex()
}

const secret = 'secret-key'
const data = 'message-to-sign'

const hash = await generateHMAC(secret, data)
```

## `@noble/hashes`

```js
import { hmac } from '@noble/hashes/hmac.js' // [!code ++]
import { sha256 } from '@noble/hashes/sha256.js' // [!code ++]
import { bytesToHex } from '@noble/hashes/utils.js' // [!code ++]
import createHmac from 'create-hmac' // [!code --]

const secret = 'secret-key'
const data = 'message-to-sign'

const hash = createHmac('sha256', secret).update(data).digest('hex') // [!code --]
const hash = bytesToHex(hmac(sha256, secret, data)) // [!code ++]
```
