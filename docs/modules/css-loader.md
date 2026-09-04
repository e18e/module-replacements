---
description: Modern alternatives to the css-loader package
---

# Replacements for `css-loader`

`css-loader` is deprecated. webpack parses CSS itself, so the loader can be dropped from your config along with `style-loader` and `mini-css-extract-plugin`.

## Built-in CSS support

Example:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // [!code --]

module.exports = {
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] } // [!code --]
    ]
  },
  plugins: [new MiniCssExtractPlugin()] // [!code --]
}
```

> [!NOTE]
> Preprocessors still need their loaders. Sass, Less and PostCSS are not covered by built-in CSS support.
