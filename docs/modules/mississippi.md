---
description: Modern alternatives to the mississippi package
---

# Replacements for `mississippi`

`mississippi` exposes stream helpers as `miss.pipe`, `miss.each`, `miss.pipeline`, and so on. Each export wraps a separate npm package internally, but migration targets the **`miss.*` call sites** and replaces each with the corresponding native `node:stream` API below.

## `miss.pipe`

```ts
import miss from 'mississippi' // [!code --]
import { pipeline } from 'node:stream/promises' // [!code ++]

miss.pipe(s1, s2, s3, cb) // [!code --]
await pipeline(s1, s2, s3) // [!code ++]
```

For callback-style usage, use [`stream.pipeline`](https://nodejs.org/api/stream.html#streampipelinestreams-callback).

## `miss.each`

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

Note that `miss.each` reports stream errors through its done callback, while `for await` throws them wrap the loop in `try/catch` to handle errors.

## `miss.pipeline`

```ts
import miss from 'mississippi' // [!code --]
import { compose } from 'node:stream' // [!code ++]

miss.pipeline(s1, s2, s3) // [!code --]
compose(s1, s2, s3) // [!code ++]
```

Requires Node.js ≥ 16.9.0.

## `miss.duplex`

See also [duplexer replacements](./duplexer.md).

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

## `miss.through`

See also [through replacements](./through.md).

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

## `miss.concat`

See also [get-stream replacements](./get-stream.md).

```ts
import miss from 'mississippi' // [!code --]
import { buffer } from 'node:stream/consumers' // [!code ++]

stream.pipe(miss.concat((data) => fn(data))) // [!code --]
const data = await buffer(stream) // [!code ++]
fn(data) // [!code ++]
```

Unlike `miss.concat`, which adapts its output to the input type, `buffer` always returns a `Buffer`. `node:stream/consumers` also exports `text`, `json`, and `arrayBuffer` for those cases.

Requires Node.js ≥ 16.7.0 for `node:stream/consumers`.

## `miss.finished`

```ts
import miss from 'mississippi' // [!code --]
import { finished } from 'node:stream/promises' // [!code ++]

miss.finished(stream, cb) // [!code --]
await finished(stream) // [!code ++]
```

For callback-style usage, use [`stream.finished`](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback).

## `miss.from`

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

## `miss.to`

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

## `miss.parallel`

<!-- prettier-ignore -->
```ts
import miss from 'mississippi' // [!code --]
 
stream.pipe( // [!code --]
  miss.parallel(10, (data, cb) => cb(null, fn(data))) // [!code --]
) // [!code --]
 
stream.map((data) => fn(data), { concurrency: 10 }) // [!code ++]
```

Like `miss.parallel`, `map` preserves the order of the input stream.

Requires Node.js >= 17.4.0 for `Readable.prototype.map`.
