---
description: Modern alternatives for the slice-ansi package for slicing terminal strings
---

# Replacements for `slice-ansi`

## `fast-slice-ansi`

[`fast-slice-ansi`](https://github.com/43081j/fast-slice-ansi) is a faster and smaller alternative to `slice-ansi` for slicing strings with ANSI escape codes.

```ts
import sliceAnsi from 'slice-ansi' // [!code --]
import { sliceAnsi } from 'fast-slice-ansi' // [!code ++]
import { styleText } from 'node:util'

const value = `The quick ${styleText('red', 'brown fox')} jumped over the lazy dog`

console.log(sliceAnsi(value, 10, 25))
```
