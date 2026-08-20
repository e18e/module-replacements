---
description: Smaller alternatives to the open package for opening files and URLs
---

# Replacements for `open`

## `tiny-open`

[`tiny-open`](https://github.com/fabiospampinato/tiny-open) is a tiny, zero-dependency utility for opening a file or URL with its default application. It covers the common use cases of [`open`](https://github.com/sindresorhus/open) with a much smaller install footprint.

Example:

```ts
import open from 'open' // [!code --]
import open from 'tiny-open' // [!code ++]

await open('https://example.com')
await open('/path/to/file.txt')

// with a specific app
await open('https://example.com', 'Google Chrome')
```

> [!NOTE]
> Advanced options (`wait`, `app.arguments`, the `openApp` export) have no direct equivalent in `tiny-open`.
