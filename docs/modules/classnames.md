---
description: Modern alternatives to the classnames package for building CSS class strings
---

# Replacements for `classnames`

`classnames` builds a `className` string from strings, objects and arrays. `clsx` takes the same arguments and is a smaller drop-in replacement.

## `clsx`

[`clsx`](https://github.com/lukeed/clsx) has no dependencies and ships both ESM and CommonJS builds. It accepts the same strings, objects, arrays and falsy values, so in most code only the import changes:

```ts
import classNames from 'classnames' // [!code --]
import { clsx } from 'clsx' // [!code ++]

const className = classNames('btn', { 'btn-active': isActive }, extra) // [!code --]
const className = clsx('btn', { 'btn-active': isActive }, extra) // [!code ++]
```

`clsx` also has a default export, so `import clsx from 'clsx'` works too.

If you only ever pass strings, `clsx/lite` is even smaller. It ignores objects and arrays, so `clsx('btn', { active: true })` from `clsx/lite` returns `'btn'`.

A few things work differently:

- `classnames` calls a custom `toString()` on objects that define one. `clsx` treats every object as a map of class names, so an object with its own `toString` method becomes `'toString'` and a class instance with a `toString` method becomes `''`. Convert such values with `String(value)` before passing them.
- `classnames/dedupe` and `classnames/bind` have no `clsx` equivalent. For CSS modules, look up the names yourself, for example `clsx(styles.btn, isActive && styles.active)`.
