---
description: Modern alternatives to the deep-equal package for deep object comparison
---

# Replacements for `deep-equal`

## `util.isDeepStrictEqual` (native, since Node.js v9.0.0)

Node.js has a builtin function [`isDeepStrictEqual`](https://nodejs.org/api/util.html#utilisdeepstrictequalval1-val2-options). Consider using that if you don’t need browser support.

Example:

```diff
- import equal from 'deep-equal'
+ import { isDeepStrictEqual } from 'node:util'

  const a = { foo: 'bar' }
  const b = { foo: 'bar' }

- equal(a, b) // true
+ isDeepStrictEqual(a, b) // true
```

## `dequal`

[`dequal`](https://github.com/lukeed/dequal) has the same simple API as `deep-equal`.

Example:

```diff
- import equal from 'deep-equal'
+ import dequal from 'dequal'

  const a = { foo: 'bar' }
  const b = { foo: 'bar' }

- equal(a, b) // true
+ dequal(a, b) // true
```
