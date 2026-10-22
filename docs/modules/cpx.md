---
description: Modern alternatives to the cpx package for copying file globs with watch mode
---

# Replacements for `cpx`

`cpx` hasn't had a release since 2016 and has bugs and performance issues that are fixed by its replacement

## `cpx2`

[`cpx`](https://github.com/mysticatea/cpx) is unmaintained. [`cpx2`](https://github.com/bcomnes/cpx2) is an actively maintained fork that keeps the same CLI bin name (`cpx`), so it works as a drop-in replacement for CLI usage. For the Node API, switch your import to `cpx2`.

```sh
npm i -D cpx # [!code --]
npm i -D cpx2 # [!code ++]

# CLI stays the same (bin name is still "cpx")
cpx "src/**/*.{html,png,jpg}" app --watch
```

Node API replacement:

<!-- eslint-skip -->

```ts
const cpx = require('cpx') // [!code --]
const cpx = require('cpx2') // [!code ++]

cpx.copy('src/**/*.js', 'dist', (err) => {
  if (err) throw err
})
```
