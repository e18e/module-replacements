---
description: Modern alternatives to the gray-matter package for parsing front matter
---

# Replacements for `gray-matter`

`gray-matter` has not been maintained since 2019 and carries known security issues, including eval-based JavaScript front matter (RCE) and an outdated `js-yaml` dependency with DoS vulnerabilities. [`@11ty/gray-matter`](https://github.com/11ty/gray-matter) is a maintained fork used by Eleventy v4 and Docusaurus.

## `@11ty/gray-matter`

[`@11ty/gray-matter`](https://github.com/11ty/gray-matter) upgrades `js-yaml` to v4, uses `Uint8Array` internally for better runtime compatibility, and removes the built-in JavaScript front matter engine that relied on `eval`.

Example:

```ts
import matter from 'gray-matter' // [!code --]
import matter from '@11ty/gray-matter' // [!code ++]

const { data, content } = matter('---\ntitle: Hello\n---\n\nBody')
```
