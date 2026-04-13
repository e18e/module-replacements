---
description: Native Node.js alternatives to the split package for splitting stream by lines
---

# Replacements for `split`

## `readline.createInterface` (native, since Node.js v6.6.0)

Example:

<!-- prettier-ignore -->
```diff
- import split from 'split'
+ import { createInterface } from 'node:readline'
  
  const input = fs.createReadStream('file.txt')
  
- const stream = input.pipe(split())
- stream.on('data', (line) => {
-   fn(line)
- })
  
+ const lines = createInterface({ input, crlfDelay: Infinity })
  
+ for await (const line of lines) {
+   fn(line)
+ }
```
