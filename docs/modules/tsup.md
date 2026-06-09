---
description: Modern alternative to tsup for bundling TypeScript libraries
---

# Replacements for `tsup`

## Scope

This replacement is for **existing `tsup` users** only. It is not a recommendation for projects on other bundlers, or for projects that do not need a bundler.

## `tsdown`

[tsdown](https://github.com/rolldown/tsdown) is the successor recommended by [tsup's own README](https://github.com/egoist/tsup) since August 2025. The project is effectively in maintenance mode. tsdown is built on Rolldown and is typically faster for library builds, with a largely drop-in config surface.

### Config migration

Most `tsup.config.ts` files map 1:1 to `tsdown.config.ts`:

```ts
import { defineConfig } from 'tsup' // [!code --]
import { defineConfig } from 'tsdown' // [!code ++]

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
})
```

### Package scripts

```json
{
  "scripts": {
    "build": "tsup" // [!code --]
    "build": "tsdown" // [!code ++]
  }
}
```

### Automated migration

- `npx tsdown-migrate`
- `npx skills add rolldown/tsdown --skill tsdown-migrate`

### Requirements

- Node.js >= 20.19 (current active LTS line)
