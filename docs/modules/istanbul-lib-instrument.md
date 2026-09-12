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

The fork is ESM-only and requires Node 22, so it is a bigger jump than a plain import swap if you are still on CommonJS. It ships its own types, so you can drop `@types/istanbul-lib-instrument` once you migrate.
