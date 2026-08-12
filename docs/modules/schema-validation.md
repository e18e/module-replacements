---
description: Modern alternatives for TypeScript schema validation
---

# TypeScript schema validation (shared)

This page contains the common, recommended alternatives and examples for TypeScript schema validation libraries.

See [Schema Benchmarks](https://schemabenchmarks.dev/download) to explore other schema validation libraries and compare their bundle sizes and runtime behavior.

When migrating between schema libraries, verify optionality, empty-string handling, type coercion, unknown object keys, error messages, and synchronous versus asynchronous validation.

## `valibot`

[`valibot`](https://valibot.dev/) is a modular schema validation library with a functional, tree-shakable API.

Example:

```ts
import * as v from 'valibot'

const personSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  age: v.pipe(v.number(), v.minValue(0))
})

const person = v.parse(personSchema, input)
```

Valibot schemas are required by default; wrap optional fields with `v.optional(...)`. Use `v.nonEmpty()` when empty strings are invalid, and compose further checks with `v.pipe(...)`. `v.parse` is synchronous; use `v.parseAsync` for asynchronous validation.

Valibot makes transformations explicit (for example, `v.toNumber()`), and `v.object` removes unknown keys. Use `v.looseObject` when those keys need to be preserved.

## `zod/mini`

[`zod/mini`](https://zod.dev/packages/mini) is the tree-shakable, functional API included with Zod 4. Install `zod@^4.0.0` and import the `zod/mini` subpath.

Example:

```ts
import * as z from 'zod/mini'

const personSchema = z.object({
  name: z.string().check(z.minLength(1)),
  age: z.number().check(z.gte(0))
})

const person = personSchema.parse(input)
```

Zod Mini schemas are required by default; wrap optional fields with `z.optional(...)`. Its functional checks are passed to the schema with `.check(...)`, while `parse`, `safeParse`, `parseAsync`, and `safeParseAsync` remain schema methods. As with Valibot, `z.object` strips unknown keys by default; use `z.looseObject` to preserve them.

Zod Mini does not load a default error-message locale. Configure one explicitly, for example with `z.config(z.locales.en())`, when callers depend on English error messages.
