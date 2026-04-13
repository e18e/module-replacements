---
description: Modern alternatives to the clean-webpack-plugin package
---

# Replacements for `clean-webpack-plugin`

## `output.clean` (built-in, since webpack 5)

Example:

```diff
- const { CleanWebpackPlugin } = require('clean-webpack-plugin')

  module.exports = {
-   plugins: [new CleanWebpackPlugin()],
+   output: { clean: true }
  }
```
