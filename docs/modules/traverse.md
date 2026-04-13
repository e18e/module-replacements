---
description: Modern alternative to the traverse package to traverse and transform objects by visiting every node on a recursive walk
---

# Replacements for `traverse`

## `neotraverse`

[`neotraverse`](https://github.com/puruvj/neotraverse) is a TypeScript rewrite of [`traverse`](https://github.com/ljharb/js-traverse) with no dependencies. It offers a drop‑in compatible build as well as a modern API.

```diff
- import traverse from 'traverse'
+ import traverse from 'neotraverse'

  const obj = [5, 6, -3, [7, 8, -2, 1], { f: 10, g: -13 }]

  traverse(obj).forEach(function (x) {
    if (x < 0) this.update(x + 128)
  })

  console.log(obj)
```
