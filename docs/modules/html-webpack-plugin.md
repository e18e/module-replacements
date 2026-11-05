---
description: Modern alternatives to the html-webpack-plugin package for generating HTML pages with webpack
---

# Replacements for `html-webpack-plugin`

Since webpack 5.109.0, webpack can generate HTML pages and use HTML files as entry points itself.

## `output.html` (built-in, since webpack 5.109.0)

`output.html` generates a page for each JavaScript entry and injects its scripts and styles, like the plugin does without a template. Pages are named after their entry, so set `output.htmlFilename` to keep `index.html`.

<!-- prettier-ignore -->
```js
const HtmlWebpackPlugin = require('html-webpack-plugin') // [!code --]

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({ title: 'My app' })], // [!code --]
  output: {
    htmlFilename: 'index.html', // [!code ++]
    html: { // [!code ++]
      title: 'My app', // [!code ++]
      meta: { charset: 'utf-8', viewport: 'width=device-width, initial-scale=1' } // [!code ++]
    } // [!code ++]
  }
}
```

`output.html` also covers `favicon`, `inject`, `scriptLoading`, `base`, and more. See the [`output.html` docs](https://webpack.js.org/configuration/output/#outputhtml).

## HTML entry points (built-in, since webpack 5.109.0)

If you use a `template`, make the HTML file the entry instead, and reference your script from it. webpack bundles the scripts and styles the page references, and rewrites their URLs.

<!-- prettier-ignore -->
```js
const HtmlWebpackPlugin = require('html-webpack-plugin') // [!code --]

module.exports = {
  entry: './src/index.js', // [!code --]
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })] // [!code --]
  entry: './src/index.html' // [!code ++]
}
```

```html
<!-- src/index.html -->
<body>
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
```

The HTML is not run through a template engine, so templates using `<%= htmlWebpackPlugin.options.title %>` or `templateParameters` need to be rewritten as plain HTML, or set through `output.html` instead.
