---
description: Modern alternatives to the concat-stream package
---

# Replacements for `concat-stream`

## Utility Consumers (native, since Node.js 16.7.0)

### Consuming as a string

<!-- prettier-ignore -->
```js
import concat from 'concat-stream' // [!code --]
import { text } from 'node:stream/consumers' // [!code ++]

readable.pipe(concat((data) => { // [!code --]
  const str = data.toString('utf-8') // [!code --]
  console.log(str) // [!code --]
})) // [!code --]

const str = await text(readable) // [!code ++]
console.log(str) // [!code ++]
```

### Consuming as Buffer

<!-- prettier-ignore -->
```js
import concat from 'concat-stream' // [!code --]
import { buffer } from 'node:stream/consumers' // [!code ++]

readable.pipe(concat((data) => { // [!code --]
  console.log(data.length) // [!code --]
})) // [!code --]

const data = await buffer(readable) // [!code ++]
console.log(data.length) // [!code ++]
```

### Consuming as an Array

<!-- prettier-ignore -->
```js
import concat from 'concat-stream' // [!code --]
import { toArray } from 'node:stream/consumers' // [!code ++]

readable.pipe(concat({ encoding: 'object' }, (items) => { // [!code --]
  console.log(items) // [!code --]
})) // [!code --]

const items = await toArray(readable) // [!code ++]
console.log(items) // [!code ++]
```

Alternatively, using an async iterable loop:

```js
for await (const chunk of readable) {
  // ...
}
```
