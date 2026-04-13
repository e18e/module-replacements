---
description: Modern alternatives to the body-parser package for parsing HTTP request bodies in Node.js servers
---

# Replacements for `body-parser`

## `milliparsec`

[`milliparsec`](https://github.com/tinyhttp/milliparsec) is a lightweight alternative to [`body-parser`](https://github.com/expressjs/body-parser) with a smaller footprint.

Example:

```diff
- import bodyParser from 'body-parser'
+ import { json, urlencoded } from 'milliparsec'
  import express from 'express'

  const app = express()

- app.use(bodyParser.json())
- app.use(bodyParser.urlencoded({ extended: true }))

+ app.use(json())
+ app.use(urlencoded())
```

For API differences and feature comparison, see the [migration.md](https://github.com/tinyhttp/milliparsec/blob/master/migration.md).
