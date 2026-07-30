---
description: Modern alternatives to the yup package for TypeScript schema validation
---

# Replacements for `yup`

[`valibot`](https://valibot.dev/) and [`zod/mini`](https://zod.dev/packages/mini) are modular, tree-shakable alternatives to `yup`. Both support [Standard Schema](https://standardschema.dev/), allowing them to work with schema-agnostic integrations. See [Schema Benchmarks](https://schemabenchmarks.dev/download) for current comparisons of schema library bundle sizes and runtime behavior.

## `valibot`

Valibot uses a functional API. Its [migration guide](https://valibot.dev/guides/migrate-from-yup/) covers the complete mapping from Yup APIs.

<!-- prettier-ignore -->
```ts
import * as yup from 'yup' // [!code --]
import * as v from 'valibot' // [!code ++]

const schema = yup.object({ // [!code --]
  name: yup.string().required(), // [!code --]
  age: yup.number().min(0).required() // [!code --]
}) // [!code --]

const schema = v.object({ // [!code ++]
  name: v.pipe(v.string(), v.nonEmpty()), // [!code ++]
  age: v.pipe(v.number(), v.minValue(0)) // [!code ++]
}) // [!code ++]

const value = await schema.validate(input) // [!code --]
const value = v.parse(schema, input) // [!code ++]
```

Yup schemas are optional by default, whereas Valibot schemas are required by default. `yup.string().required()` also rejects an empty string, so use `v.nonEmpty()` when preserving that behavior. Validation chains become `v.pipe(...)` calls, and `v.parse` is synchronous; use `v.parseAsync` for asynchronous validation.

Yup casts input before validation and preserves unknown object keys by default. Valibot makes transformations explicit (for example, `v.toNumber()`), and `v.object` removes unknown keys. Use `v.looseObject` when those keys need to be preserved.

## `zod/mini`

Zod Mini is the tree-shakable, functional API included with Zod 4. Install `zod@^4.0.0` and import the `zod/mini` subpath:

<!-- prettier-ignore -->
```ts
import * as yup from 'yup' // [!code --]
import * as z from 'zod/mini' // [!code ++]

const schema = yup.object({ // [!code --]
  name: yup.string().required(), // [!code --]
  age: yup.number().min(0).required() // [!code --]
}) // [!code --]

const schema = z.object({ // [!code ++]
  name: z.string().check(z.minLength(1)), // [!code ++]
  age: z.number().check(z.gte(0)) // [!code ++]
}) // [!code ++]

const value = await schema.validate(input) // [!code --]
const value = schema.parse(input) // [!code ++]
```

Zod Mini schemas are required by default; wrap optional fields with `z.optional(...)`. Its functional checks replace Yup's chained validation methods, while `parse`, `safeParse`, `parseAsync`, and `safeParseAsync` remain schema methods. As with Valibot, `z.object` strips unknown keys by default; use `z.looseObject` to preserve them.

Zod Mini does not load a default error-message locale. Configure one explicitly, for example with `z.config(z.locales.en())`, when callers depend on English error messages.
