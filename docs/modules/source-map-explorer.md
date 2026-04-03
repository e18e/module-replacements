---
description: Modern alternatives to the source-map-explorer package for exploring bundle sourcemaps
---

# Replacements for `source-map-explorer`

## `webpack-bundle-analyzer`

[`webpack-bundle-analyzer`](https://github.com/webpack/webpack-bundle-analyzer) allows you to visualize webpack bundles

Example:

```js
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
}
```

## `rollup-plugin-visualizer`

[`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer) allows you to visualize rollup, rolldown, and vite bundles

Import the plugin:

```javascript
import { visualizer } from 'rollup-plugin-visualizer'
```

### Rollup (`rollup.config.js`)

```js
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    // Keep it last.
    visualizer()
  ]
}
```

### Rolldown (`rolldown.config.ts`)

```js
import { defineConfig, type RolldownPlugin } from 'rolldown'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [visualizer() as RolldownPlugin]
})
```

### Vite (`vite.config.js`)

```js
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [visualizer()]
}
```

### Vite + TypeScript (`vite.config.ts`)

```ts
import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [visualizer() as PluginOption]
})
```

## `sonda`

[`sonda`](https://github.com/filipsobol/sonda) allows you to visualize vite, rollup, rolldown, esbuild, webpack, and rspack bundles

Example:

```js
import { defineConfig } from 'vite'
import Sonda from 'sonda/vite'

export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [Sonda()]
})
```

For full docs check their [website](https://sonda.dev/getting-started).
