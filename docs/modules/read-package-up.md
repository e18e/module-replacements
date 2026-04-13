---
description: Modern alternatives to the read-package-up package for reading package.json files up the directory tree
---

# Replacements for `read-package-up`

## `pkg-types`

[`pkg-types`](https://github.com/unjs/pkg-types) provides a similar API and strong types.

For example:

```diff
+ import { readPackageJSON } from 'pkg-types'
- import { readPackageUp } from 'read-package-up'

- const packageJson = await readPackageUp()
+ const packageJson = await readPackageJSON()
```

Similarly, you can get hold of the path via `resolvePackageJSON`:

```ts
import { resolvePackageJSON } from 'pkg-types'

const packageJsonPath = await resolvePackageJSON()
```

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

It can be combined with `node:fs` to read `package.json` files:

```diff
+ import fs from 'node:fs/promises'
+ import * as pkg from 'empathic'
- import { readPackageUp } from 'read-package-up'

- const packageJson = await readPackageUp()
+ const packageJsonPath = pkg.up()
+ const packageJson = packageJsonPath
+   ? JSON.parse(await readFile(packageJsonPath, 'utf8'))
+   : undefined
```

> [!NOTE]
> This is of course a more manual way to read the `package.json` file, so one of the other options may be more attractive.
