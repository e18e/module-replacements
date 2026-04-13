---
description: Modern alternatives to uri-js for RFC 3986 URI parsing, resolving, and normalization
---

# Replacements for `uri-js`

[`uri-js`](https://github.com/garycourt/uri-js) is unmaintained and triggers deprecation warnings on modern Node.js ([due to `punycode`](https://github.com/garycourt/uri-js/pull/95)).

## `URL` (native)

Good for standard web URLs (http/https/ws/wss/file/mailto, etc.).

- MDN URL: https://developer.mozilla.org/en-US/docs/Web/API/URL
- Node.js URL: https://nodejs.org/api/url.html#class-url

Example:

```diff
- import * as URI from 'uri-js'

- URI.resolve('https://a/b/c/d?q', '../../g')
+ new URL('../../g', 'https://a/b/c/d?q').href
```

> [!NOTE]
> [WHATWG URL](https://url.spec.whatwg.org/) differs from [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) in some details and may not cover arbitrary custom schemes/URNs.

## `uri-js-replace`

[`uri-js-replace`](https://github.com/andreinwald/uri-js-replace) is a drop-in, zero-dependency replacement for `uri-js` with the same API and no deprecation warnings.

```diff
- import * as URI from 'uri-js'
+ import * as URI from 'uri-js-replace'

  const parsed = URI.parse('uri://user:pass@example.com:123/one/two?q=a#f')
  const out = URI.serialize({
    scheme: 'http',
    host: 'example.com',
    fragment: 'footer'
  })
  const norm = URI.normalize('URI://www.example.org/red%09ros\xE9#red')
```

## `fast-uri`

[`fast-uri`](https://github.com/fastify/fast-uri) is a zero-dependency, high-performance RFC 3986 URI toolbox (parse/serialize/resolve/equal) with options similar to `uri-js`.

```diff
- import * as uri from 'uri-js'
+ import * as uri from 'fast-uri'

  uri.parse('uri://user:pass@example.com:123/one/two.three?q1=a1#a')
  uri.serialize({ scheme: 'http', host: 'example.com', fragment: 'footer' })
  uri.resolve('uri://a/b/c/d?q', '../../g')
  uri.equal('example://a/b/%7Bfoo%7D', 'eXAMPLE://a/./b/../b/%63/%7bfoo%7d')
```
