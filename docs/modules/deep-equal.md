---
description: Modern alternatives to the deep-equal package for deep object comparison
---

# Replacements for `deep-equal`

## `util.isDeepStrictEqual` (native, since Node.js v9.0.0)

Node.js has a builtin function [`isDeepStrictEqual`](https://nodejs.org/api/util.html#utilisdeepstrictequalval1-val2-options). Consider using that if you don’t need browser support.

Example:

```ts
import equal from 'deep-equal' // [!code --]
import { isDeepStrictEqual } from 'node:util' // [!code ++]

const a = { foo: 'bar' }
const b = { foo: 'bar' }

equal(a, b) // true [!code --]
isDeepStrictEqual(a, b) // true [!code ++]
```

## `dequal`

[`dequal`](https://github.com/lukeed/dequal) has the same simple API as `deep-equal`.

Example:

```ts
import equal from 'deep-equal' // [!code --]
import dequal from 'dequal' // [!code ++]

const a = { foo: 'bar' }
const b = { foo: 'bar' }

equal(a, b) // true [!code --]
dequal(a, b) // true [!code ++]
```

## `Bun.deepEquals` (native, Bun)

Bun has a built-in [`Bun.deepEquals`](https://bun.com/docs/runtime/utils#bun-deepequals) function. It accepts two values to compare, and an optional `strict` flag (default `false`).

Example:

```ts
import equal from 'deep-equal' // [!code --]

const a = { foo: 'bar' }
const b = { foo: 'bar' }

equal(a, b) // true [!code --]
Bun.deepEquals(a, b) // true [!code ++]

// Strict Mode
equal(a, b, { strict: true }) // true [!code --]
Bun.deepEquals(a, b, true) // true [!code ++]
```
