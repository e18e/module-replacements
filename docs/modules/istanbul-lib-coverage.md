---
description: Modern alternatives to the istanbul-lib-coverage package
---

# Replacements for `istanbul-lib-coverage`

`istanbul-lib-coverage` is no longer maintained.

## `@vitest/istanbul-lib-coverage`

The Vitest team publishes
[`@vitest/istanbul-lib-coverage`](https://www.npmjs.com/package/@vitest/istanbul-lib-coverage),
a maintained fork that keeps the same API. The exported functions and classes
keep their existing names, so in most projects the only change is the package
you import from.

```ts
import { createCoverageMap } from 'istanbul-lib-coverage' // [!code --]
import { createCoverageMap } from '@vitest/istanbul-lib-coverage' // [!code ++]

const map = createCoverageMap(coverageData)
```

Compared to the original it is:

- Actively maintained
- Shipped as ESM instead of CommonJS only
- Bundled with its own type definitions, so you no longer need `@types/istanbul-lib-coverage`

> [!NOTE]
> The fork is ESM-only and sets `engines.node` to `>=22`, so switching is a
> larger jump than a plain import swap for projects still on CommonJS or an
> older Node version.

If you also depend on `@types/istanbul-lib-coverage` only for this package, you
can drop it once you migrate, since the fork ships its own types.
