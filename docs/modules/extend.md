---
description: Native alternatives to the extend package for deep cloning and merging objects
---

# Replacements for `extend`

## `structuredClone` (native)

If you only need to deep clone an object, you can use [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone):

```ts
import extend from 'extend' // [!code --]

extend(true, {}, config) // true [!code --]
structuredClone(config) // true [!code ++]
```

## Spread syntax

If you need to merge two shallow objects, you can use [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals):

```ts
const obj1 = { foo: 'bar', x: 42 }
const obj2 = { bar: 'baz', y: 13 }

const mergedObj = { ...obj1, ...obj2 }
```

## `defu`

If you need to deep merge two objects, you can use [`defu`](https://github.com/unjs/defu):

```ts
import { defu } from 'defu'

const options = defu(object, ...defaults)
```
