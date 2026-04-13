---
description: Modern alternatives to the invariant package for runtime assertions
---

# Replacements for `invariant`

## `tiny-invariant`

[`tiny-invariant`](https://github.com/alexreardon/tiny-invariant) provides a similar API with zero dependencies.

For example:

```diff
- import invariant from 'invariant'
+ import invariant from 'tiny-invariant'

- invariant(ok, 'Hello %s, code %d', name, code)
+ invariant(ok, `Hello ${name}, code ${code}`)
```

Similarly, you can lazily compute messages to avoid unnecessary work:

```diff
- import invariant from 'invariant'
+ import invariant from 'tiny-invariant'

- invariant(value, getExpensiveMessage())
+ invariant(value, () => getExpensiveMessage())
```
