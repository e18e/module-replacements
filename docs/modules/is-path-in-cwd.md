---
description: Native alternatives to the is-path-in-cwd package for checking whether a path is inside the current working directory
---

# Replacements for `is-path-in-cwd`

`is-path-in-cwd` is `is-path-inside` with `process.cwd()` as the parent, so use the [`is-path-inside` replacement](./is-path-inside.md) and pass the working directory yourself.

```ts
import isPathInCwd from 'is-path-in-cwd' // [!code --]
isPathInCwd(p) // [!code --]
isPathInside(p, process.cwd()) // [!code ++]
```
