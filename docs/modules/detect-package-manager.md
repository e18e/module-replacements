---
description: Lightweight alternative to detect-package-manager for detecting the package manager with zero dependencies
---

# Replacements for `detect-package-manager`

## `package-manager-detector`

[`package-manager-detector`](https://github.com/antfu-collective/package-manager-detector) is a lightweight alternative for detecting the package manager being used in a project.

It has zero dependencies, is ESM-only, and provides utilities such as constructing commands for different package managers.

Example migration from [`detect-package-manager`](https://www.npmjs.com/package/detect-package-manager):

```ts
import { detect } from 'detect-package-manager' // [!code --]
import { detect } from 'package-manager-detector' // [!code ++]

const pm = await detect() // [!code --]
const result = await detect() // [!code ++]
const pm = result?.name // [!code ++]
```

> [!NOTE]
> `package-manager-detector` returns an object with `name` and `agent` properties, while `detect-package-manager` returns a string directly.

Example migration from [`preferred-pm`](https://www.npmjs.com/package/preferred-pm):

```ts
import { preferredPM } from 'preferred-pm' // [!code --]
import { detect } from 'package-manager-detector' // [!code ++]

const result = await preferredPM() // [!code --]
const result = await detect() // [!code ++]
```

Example migration from [`which-pm`](https://www.npmjs.com/package/which-pm):

<!-- prettier-ignore -->
```ts
import { whichPM } from 'which-pm' // [!code --]
import { detect } from 'package-manager-detector' // [!code ++]

const result = await whichPM() // [!code --]
const result = await detect({ // [!code ++]
  // Include the `install-metadata` strategy to have the package manager // [!code ++]
  // that's used for installation take precedence // [!code ++]
  strategies: [ // [!code ++]
    'install-metadata', // [!code ++]
    'lockfile', // [!code ++]
    'packageManager-field', // [!code ++]
    'devEngines-field' // [!code ++]
  ] // [!code ++]
}) // [!code ++]
```
