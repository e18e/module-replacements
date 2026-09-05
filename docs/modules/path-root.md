---
description: Native alternatives to the path-root and path-root-regex packages for reading the root of a path
---

# Replacements for `path-root` / `path-root-regex`

`path-root` returns the root of a path, `/` for an absolute path and an empty string for a relative one. `path-root-regex` is the regular expression behind it, and is only ever pulled in as a dependency of `path-root`.

## In Node.js

[`parse`](https://nodejs.org/api/path.html#pathparsepath) already exposes this as its `root` property.

```ts
import pathRoot from 'path-root' // [!code --]
import { parse } from 'node:path' // [!code ++]

pathRoot(filepath) // [!code --]
parse(filepath).root // [!code ++]
```

`parse` follows the platform it runs on, so on Linux and macOS it reads `\` and `C:` as ordinary filename characters where `path-root` treated them as roots, and it reads a leading `//` as a plain root rather than a UNC server and share. Reach for `win32.parse` if you actually need to parse Windows paths on a POSIX host.

## In the browser

`node:path` is not available, so keep the regular expression. This is the one `path-root-regex` returns.

<!-- prettier-ignore -->
```ts
import pathRootRegex from 'path-root-regex' // [!code --]
const ROOT_RE = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?/ // [!code ++]

const pathRoot = (filepath) => { // [!code ++]
  if (typeof filepath !== 'string') throw new TypeError('expected a string') // [!code ++]
  return ROOT_RE.exec(filepath)[0] // [!code ++]
} // [!code ++]
```

Keep the type check. Without it the regex coerces its argument, so a non-string returns an empty string instead of throwing the way `path-root` does.
