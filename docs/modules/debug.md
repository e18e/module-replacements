---
description: Modern alternatives to the debug package
---

# Replacements for `debug`

## `obug`

[`obug`](https://github.com/sxzz/obug) is a lightweight JavaScript debugging utility, forked from debug, featuring TypeScript and ESM support.

`obug` v1 retains compatibility with debug, but drops support for older browsers and Node.js versions, making it a drop-in replacement.

`obug` v2 refactors some API imports and usage for better support of ESM and TypeScript, easier customization, and an even smaller package size.

```diff
- import debug from 'debug'
+ import { createDebug } from 'obug'

- const logger = debug('name')
+ const logger = createDebug('name')
```
