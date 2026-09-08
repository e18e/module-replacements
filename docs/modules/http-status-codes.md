---
description: Native alternatives to http-status-codes for HTTP status codes and reason phrases in Node.js
---

# Replacements for `http-status-codes`

## `http.STATUS_CODES` (native, since Node.js v0.1.22)

In Node.js, numeric status codes and the built-in [`STATUS_CODES`](https://nodejs.org/api/http.html#httpstatus_codes) table can replace common uses of `http-status-codes`. This table maps status codes to reason phrases. It is not a browser API.

### Status codes and reason phrases

Use numeric literals in place of `StatusCodes` constants and look up reason phrases in `STATUS_CODES`:

```ts
import { StatusCodes, ReasonPhrases, getReasonPhrase } from 'http-status-codes' // [!code --]
import { STATUS_CODES } from 'node:http' // [!code ++]

const statusCode = StatusCodes.OK // [!code --]
const statusCode = 200 // [!code ++]
const reason = ReasonPhrases.OK // [!code --]
const reason = STATUS_CODES[200] // [!code ++]
const errorReason = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) // [!code --]
const errorReason = STATUS_CODES[500] // [!code ++]
```

Node.js does not provide the package's named numeric constants. If names make your code clearer, define local constants for the codes you use.

### Looking up a code by its reason phrase

There is no built-in equivalent of `getStatusCode`. For occasional reverse lookups, search the table, handle a missing match, and convert the key to a number:

<!-- prettier-ignore -->
```ts
import { getStatusCode } from 'http-status-codes' // [!code --]
import { STATUS_CODES } from 'node:http' // [!code ++]

const reason = 'Internal Server Error'
const statusCode = getStatusCode(reason) // [!code --]
const entry = Object.entries(STATUS_CODES).find(([, phrase]) => phrase === reason) // [!code ++]
if (!entry) { // [!code ++]
  throw new Error(`Reason phrase does not exist: ${reason}`) // [!code ++]
} // [!code ++]
const statusCode = Number(entry[0]) // [!code ++]
```

### Behavior differences

- `getReasonPhrase` throws for unknown codes, while `STATUS_CODES[code]` returns `undefined`. Add an explicit check if your application relies on that error.
- `getStatusCode` throws for unknown phrases; the reverse lookup above preserves that behavior. Matching is case-sensitive.
- Reason phrases and supported codes can differ between the package and Node.js versions. For example, `http-status-codes` 2.3.0 uses `"I'm a teapot"` for 418, while Node.js 20 uses `"I'm a Teapot"`. Check any exact text comparisons or reverse lookups when migrating.

This is not a drop-in replacement for every API or environment supported by the package.
