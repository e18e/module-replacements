---
description: Modern replacement for the wrap-ansi package for wrapping terminal strings (including ANSI-colored output)
---

# Replacements for `wrap-ansi`

## `fast-wrap-ansi`

[`fast-wrap-ansi`](https://github.com/43081j/fast-wrap-ansi) is a focused replacement for `wrap-ansi` that preserves the same usage pattern while reducing dependency overhead.

For most codebases, this is a direct import swap and works with the same common options:

```ts
import wrapAnsi from 'wrap-ansi' // [!code --]
import wrapAnsi from 'fast-wrap-ansi' // [!code ++]

const value = '\u001B[36mhello-super-long-token-without-spaces\u001B[39m'

console.log(wrapAnsi(value, 12, { hard: true, trim: false }))
```
