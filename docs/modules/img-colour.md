---
description: Modern alternatives to the @img/colour package for color parsing and manipulation
---

# Replacements for `@img/colour`

## `color`

[`@img/colour`](https://github.com/lovell/colour) is not a fork or alternative. It is an esbuild bundle of [`color`](https://github.com/Qix-/color) (and its dependencies `color-convert` and `color-string`) regenerated for CommonJS. Depending on `color` directly gives you the same API and dedupes with the many packages already using `color`, `color-convert` and `color-string`.

Example:

```ts
import Color from '@img/colour' // [!code --]
import Color from 'color' // [!code ++]

const red = Color('red').hex()
```
