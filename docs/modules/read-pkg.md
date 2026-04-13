---
description: Native Node.js alternatives to the read-pkg package for reading package.json files
---

# Replacements for `read-pkg`

## `pkg-types`

[`pkg-types`](https://github.com/unjs/pkg-types) provides a similar API and strong types.

For example:

```diff
+ import { readPackageJSON } from 'pkg-types'
- import { readPackage } from 'read-pkg'

- const packageJson = await readPackage()
+ const packageJson = await readPackageJSON()
```

You may also specify a `cwd`:

```ts
import { readPackageJSON } from 'pkg-types'

const packageJson = await readPackageJson({ cwd })
```

## Native `node:fs`

You can use `node:fs` to read a known `package.json`:

```diff
+ import fs from 'node:fs/promises'
- import { readPackage } from 'read-pkg'

- const packageJson = await readPackageUp()
+ const packageJson = JSON.parse(await readFile('./package.json', 'utf8'))
```

> [!NOTE]
> Using this approach, you will have to handle errors yourself (e.g. failure to read the file).
