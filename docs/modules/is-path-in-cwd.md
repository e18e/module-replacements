---
description: Native alternatives to the is-path-in-cwd package for checking whether a path is inside the current working directory
---

# Replacements for `is-path-in-cwd`

`is-path-in-cwd` is `is-path-inside` with `process.cwd()` as the parent, so use the [`is-path-inside` replacement](./is-path-inside.md) and pass the working directory yourself.

```ts
import path from 'node:path'

const isPathInside = (childPath, parentPath) => {
  const relation = path.relative(parentPath, childPath)
  return Boolean(
    relation &&
    relation !== '..' &&
    !relation.startsWith(`..${path.sep}`) &&
    relation !== path.resolve(childPath)
  )
}

const isPathInCwd = (p) => isPathInside(p, process.cwd())
```
