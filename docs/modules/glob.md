---
description: Modern alternatives to the glob package for file pattern matching and globbing
---

# Replacements for `glob`

## `tinyglobby`

[`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby) provides a similar API.

Example:

```ts
import { glob } from 'glob' // [!code --]
import { glob } from 'tinyglobby' // [!code ++]

const files = await glob('**/*.ts')
```

Most options available to `glob` are available in `tinyglobby`, read more at the [tinyglobby documentation](https://superchupu.dev/tinyglobby/documentation).

## `fs.glob` and `fs.promises.glob` (native, Node.js)

Since Node 22 [`fs.glob`](https://nodejs.org/api/fs.html#fsglobpattern-options-callback) and [`fs.promises.glob`](https://nodejs.org/api/fs.html#fspromisesglobpattern-options) are built-in.

Example:

<!-- eslint-skip -->

```ts
import { glob } from 'glob' // [!code --]
import { glob } from 'node:fs/promises' // [!code ++]

const files = await glob('src/**/*.ts', { // [!code --]
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

## `fdir`

[`fdir`](https://github.com/thecodrr/fdir/) offers similar functionality but through a different API (and `tinyglobby` is actually built on top of it).

Example:

<!-- eslint-skip -->

```ts
import { fdir } from 'fdir' // [!code ++]
import { glob } from 'glob' // [!code --]

const files = new fdir() // [!code ++]
  .withBasePath() // [!code ++]
  .glob('src/**/*.ts') // [!code ++]
  .crawl(cwd) // [!code ++]
  .withPromise() // [!code ++]
const files = await glob('src/**/*.ts', { cwd, maxDepth: 6 }) // [!code --]
```
