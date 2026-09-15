---
description: Modern alternatives for Lodash for array/object manipulation and common programming tasks
---

# `lodash` / `underscore`

## You don’t (may not) need Lodash/Underscore

Here you could read how to replace Lodash or Underscore in your project.

[Website](https://you-dont-need.github.io/You-Dont-Need-Lodash-Underscore)

## es-toolkit

[es-toolkit](https://es-toolkit.dev/) is a utility library similar to lodash that is designed to replace lodash by offering a seamless compat layer. It supports tree shaking out of the box and offers better performances for modern JavaScript runtimes.

## remeda

[Remeda](https://remedajs.com/) is a TypeScript-first utility library. Functions can be called data-first or data-last, so the same API works for direct calls and inside `pipe`, and named exports keep bundles tree-shakable. Remeda has no Lodash compat layer. Instead, the [Lodash migration guide](https://remedajs.com/migrate/lodash) maps each Lodash function to its Remeda equivalent or to a native alternative, and calls out where the typing is stricter or the behavior differs.
