---
description: Modern alternatives to the stream-buffers package for buffering and generating streams in Node.js
---

# Replacements for `stream-buffers`

## Utility Consumers (native, Node.js)

Since Node.js ≥ 16.7.0 [Utility Consumers](https://nodejs.org/api/webstreams.html#webstreams_utility_consumers) let you consume a Readable stream fully into memory (`Buffer`/`string`/`JSON`/`Blob`/`ArrayBuffer`).

Example:

```diff
- import streamBuffers from 'stream-buffers'
- import { pipeline } from 'node:stream/promises'
+ import { buffer } from 'node:stream/consumers'

- const sink = new streamBuffers.WritableStreamBuffer()
- await pipeline(readable, sink)

- const out = sink.getContents()
+ const out = await buffer(readable)
```

Capturing output when an API expects a Writable example:

```diff
- import streamBuffers from 'stream-buffers'
+ import { PassThrough } from 'node:stream'
+ import { buffer, text } from 'node:stream/consumers'

- const sink = new streamBuffers.WritableStreamBuffer()
+ const sink = new PassThrough()

+ const outPromise = buffer(sink)
  await someFnThatWritesTo(sink)
- const out = sink.getContents()
+ sink.end()
+ const out = await outPromise
```

Push data over time example:

```diff
- import streamBuffers from 'stream-buffers'
+ import { Readable } from 'node:stream'

- const rs = new streamBuffers.ReadableStreamBuffer()
+ const rs = new Readable({ read() {} })

- rs.put('first chunk')
+ rs.push('first chunk')

- rs.put(Buffer.from('second chunk'))
+ rs.push(Buffer.from('second chunk'))

- rs.stop()
+ rs.push(null)
```

Control chunk size and frequency example:

<!-- prettier-ignore -->
```diff
- import streamBuffers from 'stream-buffers'
+ import { Readable } from 'node:stream'
+ import { setTimeout } from 'node:timers/promises'
  
  const data = Buffer.from('...your data...')
  const frequencyMs = 10
  const chunkSize = 2048
  
- const rs = new streamBuffers.ReadableStreamBuffer({ frequency: frequencyMs, chunkSize: chunkSize })
- rs.put(data)
- rs.stop()
  
+ const rs = Readable.from(async function* () {
+   for (let i = 0; i < data.length; i += chunkSize) {
+     yield data.slice(i, i + chunkSize)
+     await setTimeout(frequencyMs)
+   }
+ }())
```
