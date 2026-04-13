---
description: Modern alternatives to the cpx package for copying file globs with watch mode
---

# Replacements for `cpx`

## `cpx2`

[`cpx`](https://github.com/mysticatea/cpx) is unmaintained. [`cpx2`](https://github.com/bcomnes/cpx2) is an actively maintained fork that keeps the same CLI bin name (`cpx`), so it works as a drop-in replacement for CLI usage. For the Node API, switch your import to `cpx2`.

```diff
- npm i -D cpx
+ npm i -D cpx2

  # CLI stays the same (bin name is still "cpx")
  cpx "src/**/*.{html,png,jpg}" app --watch
```

Node API replacement:

<!-- eslint-skip -->

```diff
- const cpx = require('cpx')
+ const cpx = require('cpx2')

  cpx.copy('src/**/*.js', 'dist', (err) => {
    if (err) throw err
  })
```
