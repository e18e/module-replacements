---
description: Modern alternatives to the istanbul-lib-instrument package for instrumenting code for coverage
---

# Replacements for `istanbul-lib-instrument`

## `@vitest/istanbul-lib-instrument`

[`istanbul-lib-instrument`](https://github.com/istanbuljs/istanbuljs) is unmaintained. [`@vitest/istanbul-lib-instrument`](https://github.com/vitest-dev/istanbuljs) is a maintained fork from the Vitest team that keeps the same exports, so in most cases only the import needs to change:

```ts
import { createInstrumenter } from 'istanbul-lib-instrument' // [!code --]
import { createInstrumenter } from '@vitest/istanbul-lib-instrument' // [!code ++]
```

> [!NOTE]
> The fork is ESM-only and sets `engines.node` to `>=22`, so switching is a
> larger jump than a plain import swap for projects still on CommonJS or an
> older Node version.

If you also depend on `@types/istanbul-lib-instrument` only for this package, you
can drop it once you migrate, since the fork ships its own types.
