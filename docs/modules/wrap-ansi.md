---
description: Modern replacement for the wrap-ansi package for wrapping terminal strings (including ANSI-colored output)
---

# Replacements for `wrap-ansi`

## `fast-wrap-ansi`

[`fast-wrap-ansi`](https://github.com/43081j/fast-wrap-ansi) is a drop‑in replacement for `wrap-ansi` that’s faster and smaller.

```ts
import wrapAnsi from 'wrap-ansi' // [!code --]
import wrapAnsi from 'fast-wrap-ansi' // [!code ++]

const value = '\u001B[36mhello-super-long-token-without-spaces\u001B[39m'

console.log(wrapAnsi(value, 12, { hard: true, trim: false }))
```
