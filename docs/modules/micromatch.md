---
description: Modern alternatives to the micromatch package for glob pattern matching
---

# Replacements for `micromatch`

## `path.matchesGlob` (native, since Node 20.17 / 22.5)

[`path.matchesGlob`](https://nodejs.org/api/path.html#pathmatchesglobpath-pattern-options) is built into modern versions of Node. Use it when you only need to test whether a path matches a single glob pattern.

Example:

```ts
import micromatch from 'micromatch' // [!code --]
import path from 'node:path' // [!code ++]

micromatch.isMatch('foo.bar', '*.bar') // [!code --]
path.matchesGlob('foo.bar', '*.bar') // [!code ++]
```

For multiple patterns, test each pattern explicitly:

```ts
const patterns = ['*.js', '*.ts']
const matches = patterns.some((pattern) => path.matchesGlob(file, pattern))
```

## `picomatch`

[`picomatch`](https://github.com/micromatch/picomatch) is the matcher micromatch is built on. It is a strong drop-in for most `isMatch` and list-filtering use cases.

Example:

```ts
import micromatch from 'micromatch' // [!code --]
import picomatch from 'picomatch' // [!code ++]

micromatch.isMatch('foo.bar', '*.bar') // [!code --]
picomatch.isMatch('foo.bar', '*.bar') // [!code ++]
```

For a reusable matcher function:

```ts
const isMatch = picomatch('*.js')
isMatch('a.js') // true
```

## `zeptomatch`

[`zeptomatch`](https://github.com/fabiospampinato/zeptomatch) is a tiny glob matcher with brace expansion, ranges, and negation. Note that its argument order is **glob first, path second**.

Example:

```ts
import micromatch from 'micromatch' // [!code --]
import zeptomatch from 'zeptomatch' // [!code ++]

micromatch.isMatch('foo.bar', '*.bar') // [!code --]
zeptomatch('*.bar', 'foo.bar') // [!code ++]
```

Zeptomatch also supports partial matching for filesystem walks and brace expansion:

```ts
zeptomatch('foo/bar/*.js', 'foo', { partial: true }) // true
zeptomatch('{a,b}.js', 'a.js') // true
zeptomatch('!*.test.js', 'foo.js') // true
```
