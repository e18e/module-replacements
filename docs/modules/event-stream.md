---
description: Modern alternatives to the event-stream package
---

# Replacements for `event-stream`

## `es.pipeline()` replacement

```ts
import es from 'event-stream' // [!code --]
import { pipeline } from 'node:stream/promises' // [!code ++]

es.pipeline(s1, s2, s3) // [!code --]
await pipeline(s1, s2, s3) // [!code ++]
```

## `es.split()` replacement

```ts
import es from 'event-stream' // [!code --]
import { createReadStream } from 'node:fs' // [!code ++]
import { createInterface } from 'node:readline' // [!code ++]

createReadStream('file.txt').pipe(es.split()) // [!code --]
const lines = createInterface({ input: createReadStream('file.txt') }) // [!code ++]
```

## `es.map()` replacement

<!-- prettier-ignore -->
```ts
import es from 'event-stream' // [!code --]

readableStream.pipe( // [!code --]
  es.map((data, cb) => cb(null, fn(data))) // [!code --]
) // [!code --]

readableStream.map((data) => fn(data)) // [!code ++]
```

## `es.merge()` replacement

```ts
import es from 'event-stream' // [!code --]
import { PassThrough } from 'node:stream' // [!code ++]

es.merge([s1, s2]) // [!code --]
const combined = new PassThrough() // [!code ++]
s1.pipe(combined, { end: false }) // [!code ++]
s2.pipe(combined, { end: false }) // [!code ++]
```
