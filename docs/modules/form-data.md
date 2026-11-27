---
description: Modern alternatives to the form-data package for building multipart/form-data request bodies
---

# Replacements for `form-data`

**Motivation:** `FormData` is built into Node.js and all modern browsers, and `fetch` sends it without any extra packages.

## `FormData` (native, since Node.js 18.0.0)

The native [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) works with [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), which sets the `Content-Type` header, including the boundary, for you. Don't set that header yourself.

<!-- prettier-ignore -->
```js
import FormData from 'form-data' // [!code --]

const form = new FormData()
form.append('name', 'Jane')

await fetch('https://example.com/upload', {
  method: 'POST',
  headers: form.getHeaders(), // [!code --]
  body: form
})
```

### Buffers

Wrap the data in a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob), and pass the filename as the third argument. Set the content type on the `Blob`, since it isn't guessed from the filename.

<!-- prettier-ignore -->
```js
form.append('image', buffer, { filename: 'photo.png', contentType: 'image/png' }) // [!code --]
form.append('image', new Blob([buffer], { type: 'image/png' }), 'photo.png') // [!code ++]
```

### Files

Use [`fs.openAsBlob`](https://nodejs.org/api/fs.html#fsopenasblobpath-options) (since Node.js 19.8.0) instead of a read stream. Unlike `form-data`, the filename and content type aren't taken from the path, so pass them yourself.

<!-- prettier-ignore -->
```js
import fs from 'node:fs' // [!code --]
import { openAsBlob } from 'node:fs' // [!code ++]

form.append('report', fs.createReadStream('./report.pdf')) // [!code --]
form.append('report', await openAsBlob('./report.pdf', { type: 'application/pdf' }), 'report.pdf') // [!code ++]
```

For other streams, read them into a `Blob` first, for example with [`node:stream/consumers`](https://nodejs.org/api/webstreams.html#utility-consumers):

```js
import { buffer } from 'node:stream/consumers'

form.append('data', new Blob([await buffer(stream)]), 'data.bin')
```

### `submit()`

Use `fetch` instead.

<!-- prettier-ignore -->
```js
form.submit('https://example.com/upload', (err, res) => { // [!code --]
  // ... // [!code --]
}) // [!code --]
const res = await fetch('https://example.com/upload', { method: 'POST', body: form }) // [!code ++]
```

### `getHeaders()`, `getBuffer()` and `getLength()`

If you need the encoded body without `fetch`, for example to send it with `node:http`, encode the form with a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response). Its `Content-Type` header includes the generated boundary.

<!-- prettier-ignore -->
```js
const headers = form.getHeaders() // [!code --]
const body = form.getBuffer() // [!code --]
const encoded = new Response(form) // [!code ++]
const headers = { 'content-type': encoded.headers.get('content-type') } // [!code ++]
const body = Buffer.from(await encoded.arrayBuffer()) // [!code ++]

http.request(url, { method: 'POST', headers: { ...headers, 'content-length': body.length } }).end(body)
```

The native `FormData` always generates its own boundary, so there is no equivalent to `setBoundary()`.
