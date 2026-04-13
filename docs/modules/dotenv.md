---
description: Native Node.js alternatives to the dotenv package for loading and managing .env files in Node.js
---

# Replacements for `dotenv`

## `--env-file` / `--env-file-if-exists` (native, Node.js)

[`--env-file`](https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--env-fileconfig) (Node.js v20.6.0+) and [`--env-file-if-exists`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--env-file-if-existsfile) (Node.js v22.9.0+) can be passed as command-line flags to load environment variables from a specified file.

`--env-file` throws if the file is missing. If the file may be absent, use `--env-file-if-exists`.

```bash
node --env-file=.env index.js
```

Also supported by:

- [tsx](https://github.com/privatenumber/tsx)
- [Bun](https://bun.sh/docs/runtime/env#manually-specifying-env-files)
- [Deno](https://docs.deno.com/runtime/reference/env_variables/#.env-file)

Remove dotenv preload:

```diff
- import 'dotenv/config'
  // No import needed when using --env-file
```

Remove explicit dotenv config:

```diff
- import dotenv from 'dotenv'

- dotenv.config({ path: '.env' })
  // No runtime configuration needed
```

In package.json scripts:

```diff
  {
    "scripts": {
-     "start": "node index.js",
+     "start": "node --env-file=.env index.js"
    }
  }
```

## Node.js `parseEnv`

[`parseEnv`](https://nodejs.org/docs/latest-v22.x/api/util.html#utilparseenvcontent) (Node.js v20.12.0+) can be used to parse a `.env` string into an object without loading it into `process.env`.

```diff
- import { parse } from 'dotenv'
+ import { parseEnv } from 'node:util'

  const envContent = '...'

- const env = parse(envContent)
+ const env = parseEnv(envContent)
```

If the `.env` is a Node.js Buffer, convert it to a string first with `.toString()`.
