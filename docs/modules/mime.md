---
description: Lighter alternative to the mime package for looking up MIME types from file extensions
---

# Replacements for `mime`

## `mrmime`

[`mrmime`](https://github.com/lukeed/mrmime) is a smaller alternative to [`mime`](https://github.com/broofa/mime) for looking up MIME types from extensions or filenames. It only includes standard MIME types; experimental and vendor-specific types are omitted.

Example:

```js
import mime from 'mime' // [!code --]
import { lookup } from 'mrmime' // [!code ++]

mime.getType('txt') // [!code --]
lookup('txt') // [!code ++]
// also works: lookup('.txt'), lookup('a.txt')
```
