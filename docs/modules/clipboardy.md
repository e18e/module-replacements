---
description: Modern alternatives to the clipboardy package for copy/pasting on Node.js and in the browser
---

# Replacements for `clipboardy`

## `tinyclip`

[`tinyclip`](https://github.com/tinylibs/tinyclip) provides cross-platform clipboard functionality to Node.js.

```diff
- import clipboard from 'clipboardy'
+ import * as clipboard from 'tinyclip'

- await clipboard.write('hello world')
+ await clipboard.writeText('hello world')
- await clipboard.read()
+ await clipboard.readText()
```

> [!NOTE]
> `writeSync()` and `readSync()` do not have any equivalent in `tinyclip`, we recommend you migrate to their async versions.

## Clipboard API (native, browser)

Learn more about the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

```diff
- import clipboard from 'clipboardy'

- await clipboard.write('hello world')
+ await navigator.clipboard.writeText('hello world')
- await clipboard.read()
+ await navigator.clipboard.readText()
```

> [!NOTE]
> `writeSync()` and `readSync()` do not have an equivalent in browsers.
