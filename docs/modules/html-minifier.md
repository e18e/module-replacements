---
description: Modern replacement for the html-minifier package for minifying HTML with embedded CSS, JavaScript, and SVG
---

# Replacements for `html-minifier`

## `html-minifier-next`

[`html-minifier-next`](https://github.com/j9t/html-minifier-next) is the official successor to [`html-minifier`](https://github.com/kangax/html-minifier). It is actively maintained, faster, and adds features such as SVG minification and preset configurations.

```ts
import minify from 'html-minifier' // [!code --]
import { minify } from 'html-minifier-next' // [!code ++]

const html = '<p title="example">foo</p>'

const result = minify(html, { collapseWhitespace: true }) // [!code --]
const result = await minify(html, { collapseWhitespace: true }) // [!code ++]
```

CommonJS:

```ts
const minify = require('html-minifier').minify // [!code --]
const { minify } = require('html-minifier-next') // [!code ++]

const html = '<p title="example">foo</p>'

;(async () => {
  const result = minify(html, { collapseWhitespace: true }) // [!code --]
  const result = await minify(html, { collapseWhitespace: true }) // [!code ++]
})()
```
