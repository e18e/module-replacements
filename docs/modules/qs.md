---
description: Modern alternatives to the qs package for parsing and serializing query strings
---

# Replacements for `qs`

## `URLSearchParams` (native)

[`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) is built into browsers and Node.js (>= 10). Use it when you don’t need nested objects or automatic array parsing. It preserves multiple values via `getAll`, and `toString()` gives you a URL-safe query string.

Example:

```diff
- import qs from 'qs'

  const query = 'a=1&a=2&b=3'

- const obj = qs.parse(query)
+ const sp = new URLSearchParams(query)
+ const obj = Object.fromEntries(sp)
+ const a = sp.getAll('a')
```

## `fast-querystring`

[`fast-querystring`](https://github.com/anonrig/fast-querystring) is tiny and very fast. It handles flat key/value pairs and repeated keys as arrays; it does not support nested objects. Use it when you need arrays but not nesting.

Example:

```diff
- import qs from 'qs'
+ import fqs from 'fast-querystring'

- const obj = qs.parse('tag=a&tag=b')
+ const obj = fqs.parse('tag=a&tag=b')

- const str = qs.stringify({ tag: ['a', 'b'], q: 'x y' })
+ const str = fqs.stringify({ tag: ['a', 'b'], q: 'x y' })
```

## `picoquery`

[`picoquery`](https://github.com/43081j/picoquery) supports nesting and arrays with a fast single‑pass parser and configurable syntax. v2.x and above are ESM‑only; v1.x is CommonJS and will be maintained with non‑breaking changes. `nestingSyntax: 'js'` offers the highest compatibility with `qs`, though you can pick other syntaxes for performance.

Example:

<!-- prettier-ignore -->
```diff
- import qs from 'qs'
+ import { parse, stringify } from 'picoquery'
  
+ const opts = {
+   nestingSyntax: 'js',
+   arrayRepeat: true,
+   arrayRepeatSyntax: 'bracket'
+ }
  
- const obj = qs.parse('user[name]=foo&tags[]=bar&tags[]=baz')
+ const obj = parse('user[name]=foo&tags[]=bar&tags[]=baz', opts)
  
- const str = qs.stringify(
-   { user: { name: 'foo' }, tags: ['bar', 'baz'] },
-   { arrayFormat: 'brackets' }
- )
+ const str = stringify({ user: { name: 'foo' }, tags: ['bar', 'baz'] }, opts)
```

## `neoqs`

[`neoqs`](https://github.com/PuruVJ/neoqs) is a fork of `qs` without legacy polyfills, with TypeScript types included, and with both ESM and CommonJS builds (plus a legacy ES5 mode). Choose it when you want `qs`‑level compatibility with modern packaging options.

Example:

```diff
- import qs from 'qs'
+ import * as qs from 'neoqs'

  const obj = qs.parse('a[b][c]=1&arr[]=2&arr[]=3')
  const str = qs.stringify(obj, { arrayFormat: 'brackets' })
```
