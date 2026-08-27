---
description: Replace the unmaintained istanbul-lib-coverage package with the maintained @vitest/istanbul-lib-coverage fork
---

# Replacements for `istanbul-lib-coverage`

`istanbul-lib-coverage` is no longer maintained. The Vitest team publishes
[`@vitest/istanbul-lib-coverage`](https://www.npmjs.com/package/@vitest/istanbul-lib-coverage),
a maintained fork that keeps the same API, so migrating is usually just a matter
of changing the import.

Compared to the original it is:

- Actively maintained
- Shipped as ESM instead of CommonJS only
- Bundled with its own type definitions, so you no longer need `@types/istanbul-lib-coverage`

## `@vitest/istanbul-lib-coverage`

The exported functions and classes keep their existing names, so the only change
in most projects is the package you import from.

```ts
import { createCoverageMap } from 'istanbul-lib-coverage' // [!code --]
import { createCoverageMap } from '@vitest/istanbul-lib-coverage' // [!code ++]

const map = createCoverageMap(coverageData)
```

If you also depend on `@types/istanbul-lib-coverage` only for this package, you
can drop it once you migrate, since the fork ships its own types.
