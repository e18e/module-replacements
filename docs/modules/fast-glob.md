---
description: Modern alternatives to the fast-glob package for fast file system pattern matching
---

# Replacements for `fast-glob`

## `tinyglobby`

[`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby) is a modern, lightweight alternative that provides similar functionality with better performance.

Example:

<!-- eslint-skip -->

```ts
import fg from 'fast-glob' // [!code --]
import { glob } from 'tinyglobby' // [!code ++]

const files = await fg('**/*.ts', { // [!code --]
const files = await glob('**/*.ts', { // [!code ++]
  cwd: process.cwd(),
  ignore: ['**/node_modules/**'],
  expandDirectories: false // [!code ++]
})
```

Most options from `fast-glob` have direct equivalents in `tinyglobby`. Check the [tinyglobby documentation](https://superchupu.dev/tinyglobby/migration) for the complete list of supported options.

## `fs.glob` (native, since Node 22.x)

[`fs.glob`](https://nodejs.org/api/fs.html#fspromisesglobpattern-options) is built into modern versions of Node.

Example:

<!-- eslint-skip -->

```ts
import fg from 'fast-glob' // [!code --]
import { glob } from 'node:fs/promises' // [!code ++]

const files = await fg('src/**/*.ts', { // [!code --]
const files = await Array.fromAsync(glob('src/**/*.ts', { // [!code ++]
  cwd,
}) // [!code --]
})) // [!code ++]
```

You can also iterate over the results asynchronously:

```ts
for await (const result of glob('src/**/*.ts', { cwd })) {
  // result is an individual path
  console.log(result)
}
```

> [!NOTE]
> Node's built-in `glob` is more minimal and does not support negation patterns or fine-grained options like setting a max depth out of the box.
