---
description: Modern alternatives to the xmldom package for XML DOM parsing and serialization
---

# Replacements for `xmldom`

## `@xmldom/xmldom`

[`@xmldom/xmldom`](https://github.com/xmldom/xmldom) is the maintained fork of the original `xmldom`.

For example:

```diff
- import { DOMParser, XMLSerializer } from 'xmldom'
+ import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

  const doc = new DOMParser().parseFromString(source, 'text/xml')
  const xml = new XMLSerializer().serializeToString(doc)
```

CommonJS:

```diff
- const { DOMParser, XMLSerializer } = require('xmldom')
+ const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
```
