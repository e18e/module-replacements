---
description: Modern alternatives to the duplexer package
---

# Replacements for `duplexer`

## `Duplex.from` (native, Node.js)

<!-- prettier-ignore -->
```diff
- import duplexer from 'duplexer'
+ import { Duplex } from 'node:stream'
  
- duplexer(writableStream, readableStream)
  
+ Duplex.from({
+   writable: writableStream,
+   readable: readableStream
+ })
```
