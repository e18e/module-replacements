---
description: Modern alternatives to the has-yarn package for detecting a yarn.lock file
---

# Replacements for `has-yarn`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a generic way to find files, including searching upwards through parent directories.

Example:

```ts
import hasYarn from 'has-yarn' // [!code --]
import * as find from 'empathic/find' // [!code ++]

hasYarn() // [!code --]
Boolean(find.up('yarn.lock')) // [!code ++]
```

Like `has-yarn`, `find.up` walks up parent directories and accepts a starting directory:

```ts
Boolean(find.up('yarn.lock', { cwd }))
```
