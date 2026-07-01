---
description: Shared alternatives and examples for fetch based HTTP clients used across related modules
---

# Fetch-based HTTP clients (shared)

This page contains the common, recommended alternatives and examples for fetch based HTTP clients used by `axios`, `node-fetch`, `cross-fetch`, `@whatwg-node/fetch`, and `@whatwg-node/node-fetch` replacement docs.

## `fetch` API (native)

The native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API is available in Node.js (since v18.x) and all modern browsers. For many use cases it replaces `axios`/`node-fetch`/`cross-fetch`/`@whatwg-node/fetch`/`@whatwg-node/node-fetch` without adding dependencies.

> [!TIP]
> Node.js provides a codemod which can migrate some of this automatically, see the docs at [@nodejs/axios-to-whatwg-fetch](https://app.codemod.com/registry/@nodejs/axios-to-whatwg-fetch) for more details.

Example:

```ts
// Before (@whatwg-node/fetch named imports)
import { fetch, Request, Headers, Response } from '@whatwg-node/fetch'

// After — globals, no import needed
const res = await fetch('https://api.example.com')
const req = new Request(url, { headers: new Headers() })
```

```ts
// GET
const res = await fetch('https://api.example.com/data')
const data = await res.json()

// POST
await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
})
```

## `ofetch`

[`ofetch`](https://github.com/unjs/ofetch) is a small fetch wrapper with automatic JSON parsing, request/response interceptors, and retry support.

Example:

```ts
import { ofetch } from 'ofetch'

const api = ofetch.create({ baseURL: 'https://api.example.com' })

const data = await api('/user', { query: { id: 123 } })
const created = await api('/items', { method: 'POST', body: { name: 'A' } })
```

## `ky`

[`ky`](https://github.com/sindresorhus/ky) is a lightweight HTTP client built on top of the Fetch API. It adds convenience features like timeouts, hooks (interceptors), and a simpler API surface.

Example:

```ts
import ky from 'ky'

const api = ky.create({
  prefixUrl: 'https://api.example.com',
  timeout: 5000 // ms
})

const data = await api.get('users').json()
```
