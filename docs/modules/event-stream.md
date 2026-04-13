---
description: Modern alternatives to the event-stream package
---

# Replacements for `event-stream`

## `es.pipeline()` replacement

```diff
- import es from 'event-stream'
+ import { pipeline } from 'node:stream/promises'

- es.pipeline(s1, s2, s3)
+ await pipeline(s1, s2, s3)
```

## `es.split()` replacement

```diff
- import es from 'event-stream'
+ import { createReadStream } from 'node:fs'
+ import { createInterface } from 'node:readline'

- createReadStream('file.txt').pipe(es.split())
+ const lines = createInterface({ input: createReadStream('file.txt') })
```

## `es.map()` replacement

<!-- prettier-ignore -->
```diff
- import es from 'event-stream'
  
- readableStream.pipe(
-   es.map((data, cb) => cb(null, fn(data)))
- )
  
+ readableStream.map((data) => fn(data))
```

## `es.merge()` replacement

```diff
- import es from 'event-stream'
+ import { PassThrough } from 'node:stream'

- es.merge([s1, s2])
+ const combined = new PassThrough()
+ s1.pipe(combined, { end: false })
+ s2.pipe(combined, { end: false })
```
