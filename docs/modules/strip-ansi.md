---
description: Native Node.js alternatives to the strip-ansi package for removing ANSI escape codes from strings
---

# Replacements for `strip-ansi`

## `util.stripVTControlCharacters` (native, Node.js)

Added in v16.11.0, [util.stripVTControlCharacters](https://nodejs.org/api/util.html#utilstripvtcontrolcharactersstr) can be used to strip ANSI escape codes from a string.

```diff
- import stripAnsi from 'strip-ansi'
+ import { stripVTControlCharacters } from 'node:util'

- console.log(stripAnsi('\u001B[4me18e\u001B[0m'))
+ console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m'))
```

> [!NOTE]
> Due to [a bug](https://github.com/nodejs/node/issues/53697), in older Node versions this utility doesn't handle ANSI hyperlinks correctly. This behavior has been fixed as of NodeJS v22.10.

## Deno

Deno implements the Node `util` API, and also provides [`util.stripVTControlCharacters`](https://docs.deno.com/api/node/util/~/stripVTControlCharacters). The usage is identical:

```diff
- import stripAnsi from 'strip-ansi'
+ import { stripVTControlCharacters } from 'node:util'

- console.log(stripAnsi('\u001B[4me18e\u001B[0m'))
+ console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m'))
```

## Bun

### Using Node‑compatible API

Bun also implements Node’s [`util.stripVTControlCharacters`](https://bun.sh/reference/node/util/stripVTControlCharacters) through its Node compat layer:

```diff
- import stripAnsi from 'strip-ansi'
+ import { stripVTControlCharacters } from 'node:util'

- console.log(stripAnsi('\u001B[1mHello\u001B[0m'))
+ console.log(stripVTControlCharacters('\u001B[1mHello\u001B[0m'))
```

### Using Bun's native API (>=1.2.21)

Since Bun v1.2.21, you can use the built-in [`Bun.stripANSI`](https://bun.com/blog/release-notes/bun-v1.2.21#bun-stripansi-simd-accelerated-ansi-escape-removal) method.

```diff
- import stripAnsi from 'strip-ansi'
+ import { stripANSI } from 'bun'

- console.log(stripAnsi('\u001B[31mHello World\u001B[0m'))
+ console.log(Bun.stripANSI('\u001B[31mHello World\u001B[0m'))
```
