---
description: Modern alternatives to error-stack-parser for parsing error stack traces
---

# Replacements for `error-stack-parser`

## `error-stack-parser-es`

[`error-stack-parser-es`](https://github.com/antfu/error-stack-parser-es) is a smaller, maintained, ESM port of `error-stack-parser` with the same stack frame output.

`error-stack-parser` exposes a default export with a `parse` method. With `error-stack-parser-es`, use the named `parse` export instead.

Example:

```ts
import ErrorStackParser from 'error-stack-parser' // [!code --]
import { parse } from 'error-stack-parser-es' // [!code ++]

const frames = ErrorStackParser.parse(error) // [!code --]
const frames = parse(error) // [!code ++]
```

If you only need the raw parsed lines and not the full stack frame objects, the `error-stack-parser-es/lite` entry provides an even lighter parser.
