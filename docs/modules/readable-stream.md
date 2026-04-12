---
description: Modern alternatives to the readable-stream package for working with streaming data in Node.js
---

# Replacements for `readable-stream`

[`readable-stream`](https://github.com/nodejs/readable-stream) mirrors Node’s core streams and works in browsers. In most cases, prefer native options.

## `node:stream` (native, since Node.js v0.9.4)

Use the built-in `stream` module ([Node Streams docs](https://nodejs.org/api/stream.html)).

```ts
import { Duplex, Readable, Transform, Writable } from 'readable-stream' // [!code --]
import { Duplex, Readable, Transform, Writable } from 'node:stream' // [!code ++]
```

## Web Streams (native, browsers and Node.js 16.5.0+)

Use the [Web Streams API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) in browsers and modern Node. It’s global in Node 18+ ([Node Web Streams docs](https://nodejs.org/api/webstreams.html)); on 16.5–17.x import from `stream/web` ([details](https://nodejs.org/api/webstreams.html#streamweb-the-web-streams-api)). Interop with Node streams is available via [Readable.toWeb](https://nodejs.org/api/stream.html#streamreadabletowebstreamreadable-options) and [Writable.fromWeb](https://nodejs.org/api/stream.html#streamwritablefromwebwritablestream-options).

Example: convert a Web ReadableStream (from fetch) to a Node stream and pipe it to a file.

```ts
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'

const res = await fetch('https://example.com/data.txt') // Web ReadableStream
const nodeReadable = Readable.fromWeb(res.body)
await pipeline(nodeReadable, createWriteStream('data.txt'))
```
