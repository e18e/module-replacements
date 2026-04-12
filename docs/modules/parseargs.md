---
description: Modern alternatives to CLI argument parsing packages using Node.js built-in util.parseArgs
---

# Replacements for argument parsers

## `util.parseArgs` (native, since Node.js 16.x)

[`util.parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig) is built into Node.js (since 18.3.0 and 16.17.0) and can replace many common CLI options parsing libraries.

Example:

```ts
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    force: { type: 'boolean', short: 'f' },
    output: { type: 'string', short: 'o' }
  },
  allowPositionals: true
})
```

> [!NOTE]
> `parseArgs` only supports `string` and `boolean` types. If you'd like to support stronger types, one of the other options may be a better fit.

## `mri`

[`mri`](https://github.com/lukeed/mri) is a minimalistic argument parser that supports both short and long options, as well as positional arguments.

Example:

```ts
import mri from 'mri'

const options = mri(process.argv.slice(2), {
  alias: {
    f: 'force',
    o: 'output'
  },
  boolean: ['force']
})
```
