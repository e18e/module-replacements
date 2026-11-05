---
description: Modern alternatives to the sanitize-html package for sanitizing untrusted HTML
---

# Replacements for `sanitize-html`

[`sanitize-html`](https://github.com/apostrophecms/sanitize-html) pulls in a large dependency tree (`htmlparser2`, `parse-srcset`, `postcss` and more) and only runs in Node-like environments.

## `neosanitize`

[`neosanitize`](https://github.com/PuruVJ/neosanitize) is a zero-dependency HTML sanitizer that runs in Node, browsers and edge runtimes. It has two entry points:

- `neosanitize/legacy` is a drop-in port of `sanitize-html` 2.x, with the same API, options and output.
- `neosanitize` is a faster engine built on a WHATWG parser, with a deny-by-default policy. It is recommended for new code.

To migrate without changing any code, swap the import:

```ts
import sanitizeHtml from 'sanitize-html' // [!code --]
import sanitizeHtml from 'neosanitize/legacy' // [!code ++]
```

The recommended engine compiles a policy once and reuses it:

```ts
import sanitizeHtml from 'sanitize-html' // [!code --]
import { Sanitizer } from 'neosanitize' // [!code ++]

const opts = { allowedTags: ['a', 'b'], allowedAttributes: { a: ['href'] } } // [!code --]
const clean = sanitizeHtml(dirty, opts) // [!code --]
const sanitizer = Sanitizer.builder() // [!code ++]
  .allow(['a', 'b']) // [!code ++]
  .allow('a', ['href']) // [!code ++]
  .build() // [!code ++]
const clean = sanitizer.sanitize(dirty) // [!code ++]
```
