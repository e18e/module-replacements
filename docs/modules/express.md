---
description: Modern alternatives to the express package
---

# Replacements for `express`

Express has been the industry standard for years, but the ecosystem has shifted toward ESM-first, type-safe, and runtime-agnostic frameworks that offer significantly better performance and developer experience.

## `h3`

[`h3`](https://github.com/h3js/h3) is a minimal H(TTP) framework built for high performance and portability.

Example:

<!-- prettier-ignore -->
```diff
- import express from 'express'
+ import { H3, defineHandler, toNodeHandler } from 'h3'
+ import { createServer } from 'node:http'
  
- const app = express()
+ const app = new H3()
  
- app.get('/', (req, res) => res.send('Hello world'))
+ app.get('/', defineHandler(() => 'Hello world'))
  
- app.listen(3000)
+ createServer(toNodeHandler(app)).listen(3000)
```

## `tinyhttp`

[`tinyhttp`](https://github.com/tinyhttp/tinyhttp) is designed to be a drop-in replacement remaining compatible with many Express middlewares.

Example:

```diff
- import express from 'express'
+ import { App } from '@tinyhttp/app'

- const app = express()
+ const app = new App()

  app.get('/', (req, res) => res.send('Hello world'))

  app.listen(3000)
```

## `hono`

[`hono`](https://github.com/honojs/hono) is a small, simple, and fast web framework for the Edges.

Example:

```diff
- import express from 'express'
+ import { Hono } from 'hono'

- const app = express()
+ const app = new Hono()

- app.get('/', (req, res) => res.send('Hello world'))
+ app.get('/', (context) => context.text('Hello world'))

+ export default app
```

## `elysia`

If you are using Bun, [`elysia`](https://github.com/elysiajs/elysia) is often the best choice as it is specifically optimized for the Bun runtime.

Example:

```diff
- import express from 'express'
+ import { Elysia } from 'elysia'

- const app = express()
+ const app = new Elysia()

- app.get('/', (req, res) => res.send('Hello world'))
+ app.get('/', () => 'Hello world')

  app.listen(3000)
```
