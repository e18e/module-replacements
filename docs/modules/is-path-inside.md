---
description: Native alternatives to the is-path-inside package for checking whether one path is inside another
---

# Replacements for `is-path-inside`

[`path.relative`](https://nodejs.org/api/path.html#pathrelativefrom-to) gives you the route from the parent to the child. If that route is empty, or climbs out with `..`, the child is not inside the parent.

The comparison against `path.resolve` catches paths on a different Windows drive, where `path.relative` returns an absolute path rather than one starting with `..`.

<!-- prettier-ignore -->
```ts
import isPathInside from 'is-path-inside' // [!code --]
import path from 'node:path' // [!code ++]

const isPathInside = (childPath, parentPath) => { // [!code ++]
  const relation = path.relative(parentPath, childPath) // [!code ++]
  return Boolean( // [!code ++]
    relation && // [!code ++]
    relation !== '..' && // [!code ++]
    !relation.startsWith(`..${path.sep}`) && // [!code ++]
    relation !== path.resolve(childPath) // [!code ++]
  ) // [!code ++]
} // [!code ++]
```

Note that this is purely a string comparison. Neither the package nor the replacement touches the filesystem, so symlinks are not resolved.
