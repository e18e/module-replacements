---
description: Modern alternatives to the http-proxy package for HTTP and WebSocket proxying in Node.js
---

# Replacements for `http-proxy`

[`http-proxy`](https://github.com/http-party/node-http-proxy) has not been maintained since 2020 and has known crashes, memory leaks, and socket issues on modern Node.js versions.

## `httpxy`

[`httpxy`](https://github.com/unjs/httpxy) is a maintained fork of `http-proxy` with critical upstream bug fixes, zero dependencies, and additional helpers such as `proxyFetch` and `proxyUpgrade`.

Example:

```ts
import httpProxy from 'http-proxy' // [!code --]
import { createProxyServer } from 'httpxy' // [!code ++]
import { createServer } from 'node:http'

const proxy = httpProxy.createProxyServer({}) // [!code --]
const proxy = createProxyServer({}) // [!code ++]

const server = createServer((req, res) => {
  proxy.web(req, res, { target: 'http://localhost:8080' }) // [!code --]
  proxy.web(req, res, { target: 'http://localhost:8080' }) // [!code ++]
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'http://localhost:8080' }) // [!code --]
  proxy.ws(req, socket, { target: 'http://localhost:8080' }, head) // [!code ++]
})
```

## `http-proxy-3`

[`http-proxy-3`](https://github.com/sagemathinc/http-proxy-3) is a TypeScript rewrite with API compatibility, HTTP/2 support, and production use in Vite, JupyterHub, and CoCalc.

Example:

```ts
import httpProxy from 'http-proxy' // [!code --]
import { createProxyServer } from 'http-proxy-3' // [!code ++]
import { createServer } from 'node:http'

const proxy = httpProxy.createProxyServer({}) // [!code --]
const proxy = createProxyServer({}) // [!code ++]

const server = createServer((req, res) => {
  proxy.web(req, res, { target: 'http://localhost:8080' })
})

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: 'http://localhost:8080' }) // [!code --]
  proxy.ws(req, socket, { target: 'http://localhost:8080' }, head) // [!code ++]
})
```
