---
description: Modern alternatives to packages for deep merging objects
---

# Replacements for deep merge packages

## `defu`

If you need to deep merge two objects, you can use [`defu`](https://github.com/unjs/defu):

```ts
import { defu } from 'defu'

const options = defu(object, defaults)
```

## `@fastify/deepmerge`

The [`@fastify/deepmerge`](https://github.com/fastify/deepmerge) package is another fast and small alternative.

It also offers more options for customizing the merge behavior than other libraries.

```ts
import deepMerge from '@fastify/deepmerge'

const options = deepMerge(object, defaults)
```
