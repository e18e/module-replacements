---
description: Modern alternatives to the mississippi package
---

# Replacements for `mississippi`

`mississippi` is a facade that re-exports existing stream packages. Replace each export with the corresponding native `node:stream` API (or import the underlying package directly if you still need it).

## `ms.pipe()` replacement

Replaces `pump`.

```ts
import miss from 'mississippi' // [!code --]
import { pipeline } from 'node:stream/promises' // [!code ++]

miss.pipe(s1, s2, s3, cb) // [!code --]
await pipeline(s1, s2, s3) // [!code ++]
```

For callback-style usage, use [`stream.pipeline`](https://nodejs.org/api/stream.html#streampipelinestreams-callback).

## `ms.each()` replacement

Replaces `stream-each`.

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
 
miss.each(stream, (data, cb) => { // [!code --]
  fn(data) // [!code --]
  cb() // [!code --]
}) // [!code --]
 
for await (const data of stream) { // [!code ++]
  fn(data) // [!code ++]
} // [!code ++]
```

Note that `stream-each` reports stream errors through its done callback, while `for await` throws them — wrap the loop in `try/catch` to handle errors.

## `ms.pipeline()` replacement

Replaces `pumpify`.

```ts
import miss from 'mississippi' // [!code --]
import { compose } from 'node:stream' // [!code ++]

miss.pipeline(s1, s2, s3) // [!code --]
compose(s1, s2, s3) // [!code ++]
```

Requires Node.js ≥ 16.9.0.

## `ms.duplex()` replacement

Replaces `duplexify`. See also [duplexer replacements](./duplexer.md).

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
import { Duplex } from 'node:stream' // [!code ++]
 
miss.duplex(writableStream, readableStream) // [!code --]
 
Duplex.from({ // [!code ++]
  writable: writableStream, // [!code ++]
  readable: readableStream // [!code ++]
}) // [!code ++]
```

Requires Node.js ≥ 16.8.0 for `Duplex.from`.

## `ms.through()` replacement

Replaces `through2`. See also [through replacements](./through.md).

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
import { Transform } from 'node:stream' // [!code ++]
 
miss.through((chunk, enc, cb) => { // [!code --]
  cb(null, fn(chunk)) // [!code --]
}) // [!code --]
 
new Transform({ // [!code ++]
  transform(chunk, encoding, callback) { // [!code ++]
    callback(null, fn(chunk)) // [!code ++]
  } // [!code ++]
}) // [!code ++]
```

## `ms.concat()` replacement

Replaces `concat-stream`. See also [get-stream replacements](./get-stream.md).

```ts
import miss from 'mississippi' // [!code --]
import { buffer } from 'node:stream/consumers' // [!code ++]

stream.pipe(miss.concat((data) => fn(data))) // [!code --]
const data = await buffer(stream) // [!code ++]
fn(data) // [!code ++]
```

Unlike `concat-stream`, which adapts its output to the input type, `buffer` always returns a `Buffer`. `node:stream/consumers` also exports `text`, `json`, and `arrayBuffer` for those cases.

Requires Node.js ≥ 16.7.0 for `node:stream/consumers`.

## `ms.finished()` replacement

Replaces `end-of-stream`.

```ts
import miss from 'mississippi' // [!code --]
import { finished } from 'node:stream/promises' // [!code ++]

miss.finished(stream, cb) // [!code --]
await finished(stream) // [!code ++]
```

For callback-style usage, use [`stream.finished`](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback).

## `ms.from()` replacement

Replaces `from2`.

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
import { Readable } from 'node:stream' // [!code ++]
 
miss.from((size, cb) => cb(null, chunk)) // [!code --]
 
Readable.from( // [!code ++]
  (async function* () { // [!code ++]
    yield chunk // [!code ++]
  })() // [!code ++]
) // [!code ++]
```

## `ms.to()` replacement

Replaces `flush-write-stream`.

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
import { Writable } from 'node:stream' // [!code ++]
 
miss.to( // [!code --]
  (chunk, enc, cb) => cb(), // [!code --]
  (cb) => cb() // [!code --]
) // [!code --]
 
new Writable({ // [!code ++]
  write(chunk, encoding, callback) { // [!code ++]
    callback() // [!code ++]
  }, // [!code ++]
  final(callback) { // [!code ++]
    callback() // [!code ++]
  } // [!code ++]
}) // [!code ++]
```

## `ms.parallel()` replacement

Replaces `parallel-transform`.

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
 
stream.pipe( // [!code --]
  miss.parallel(10, (data, cb) => cb(null, fn(data))) // [!code --]
) // [!code --]
 
stream.map((data) => fn(data), { concurrency: 10 }) // [!code ++]
```

Like `parallel-transform`, `map` preserves the order of the input stream.

Requires Node.js ≥ 17.4.0 for `Readable.prototype.map`.
