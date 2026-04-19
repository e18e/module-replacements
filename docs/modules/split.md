---
description: Native Node.js alternatives to the split package for splitting stream by lines
---

# Replacements for `split`

## `readline.createInterface` (native, since Node.js v6.6.0)

The [`readline.createInterface`](https://nodejs.org/api/readline.html#readlinecreateinterfaceoptions)
method can be used to read a stream line by line, effectively replacing the functionality of the `split` package.

Example:

<!-- prettier-ignore -->
```js
import split from 'split' // [!code --]
import { createInterface } from 'node:readline' // [!code ++]
import * as fs from 'node:fs'

const input = fs.createReadStream('file.txt')

const stream = input.pipe(split()) // [!code --]
stream.on('data', (line) => { // [!code --]
  fn(line) // [!code --]
}) // [!code --]

const lines = createInterface({ input, crlfDelay: Infinity }) // [!code ++]

for await (const line of lines) { // [!code ++]
  fn(line) // [!code ++]
} // [!code ++]
```
