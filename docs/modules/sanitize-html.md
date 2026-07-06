---
description: Replacing sanitize-html with neosanitize, a zero-dependency, isomorphic HTML sanitizer with a drop-in legacy engine and a faster WHATWG-based engine
---

# Replacements for `sanitize-html`

[`sanitize-html`](https://github.com/apostrophecms/sanitize-html) is a widely used HTML sanitizer, but it pulls in a large dependency tree (including `htmlparser2`, `parse-srcset`, `postcss`, and others) and only runs in Node-like environments.

[`neosanitize`](https://github.com/PuruVJ/neosanitize) is a zero-dependency, isomorphic (works in Node, browsers, and edge runtimes) HTML sanitizer written in TypeScript. It ships two engines:

- A **legacy** engine (`neosanitize/legacy`) that is a byte-identical, drop-in port of `sanitize-html` 2.x — same API, same options, same output.
- A **root** engine (`neosanitize`) built on a fast, browser-faithful WHATWG parser with a deny-by-default policy, recommended for new code and for the best performance and security.

## `neosanitize/legacy` (drop-in replacement)

The legacy engine mirrors the `sanitize-html` API and output exactly, so migrating is usually just a matter of changing the import:

```ts
import sanitizeHtml from 'sanitize-html' // [!code --]
import sanitizeHtml from 'neosanitize/legacy' // [!code ++]

const clean = sanitizeHtml(dirty, {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    a: ['href']
  }
})
```

All `sanitize-html` options (`allowedTags`, `allowedAttributes`, `allowedSchemes`, `transformTags`, `exclusiveFilter`, etc.) are supported with identical behaviour.

## `neosanitize` (recommended)

For new code, the root module is recommended. It is built on a fast, browser-faithful WHATWG parser (100% html5lib tokenizer conformance) and follows a deny-by-default policy, so only what you explicitly allow gets through:

```ts
import sanitizeHtml from 'sanitize-html' // [!code --]
import { sanitize } from 'neosanitize' // [!code ++]

const clean = sanitize(dirty, {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: {
    a: ['href']
  }
})
```

Because it has no dependencies and runs anywhere, it works unchanged in browsers and edge runtimes:

```ts
import { sanitize } from 'neosanitize/browser'

const clean = sanitize(userInput)
```

Preset configurations are available under `neosanitize/presets`, and the underlying parser can be used directly via `neosanitize/whatwg-parser`.
