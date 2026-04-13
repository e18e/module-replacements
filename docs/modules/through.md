---
description: Modern alternatives to the through package
---

# Replacements for `through`

## `stream.Writable` (native, Node.js)

<!-- prettier-ignore -->
```diff
- import through from 'through'
+ import { Writable } from 'node:stream'
  
- through(fn)
+ new Writable({
+   write: (chunk, encoding, callback) => {
+     fn(chunk)
+     callback()
+   }
+ })
```
