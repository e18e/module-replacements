---
description: Modern alternatives to the semver package
---

# Replacements for `semver`

## `verkit`

[`verkit`](https://github.com/sxzz/verkit) is a modern SemVer toolkit designed for ESM and TypeScript projects. It is faster and smaller than `semver`.

```ts
import semver from 'semver' // [!code --]
import { isLess, satisfies } from 'verkit' // [!code ++]

semver.lt(version1, version2) // [!code --]
semver.satisfies(version, range) // [!code --]

isLess(version1, version2) // [!code ++]
satisfies(version, range) // [!code ++]
```
