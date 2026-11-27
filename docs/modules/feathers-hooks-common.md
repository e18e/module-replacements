---
description: Modern alternatives to the feathers-hooks-common package for common hooks and utilities in Feathers services
---

# Replacements for `feathers-hooks-common`

## `feathers-utils`

[`feathers-utils`](https://github.com/feathersjs/feathers-utils) is the official successor of [`feathers-hooks-common`](https://github.com/feathersjs-ecosystem/feathers-hooks-common). It provides a modern set of hooks, utilities, predicates and transformers for Feathers v5, is fully typed and tree-shakeable.

`feathers-utils` is ESM only and requires Node.js 22 or later. The migration is not a 1:1 mapping: some hooks were renamed, some were replaced by more explicit alternatives (e.g. `discard` and `keep` by `transformData`/`transformResult` with transformers), and some were removed. See the [migration guide](https://utils.feathersjs.com/migrating-from-feathers-hooks-common) for details on every hook and utility.

Example:

```ts
import { discard, iff, isProvider } from 'feathers-hooks-common' // [!code --]
import { iff, transformResult } from 'feathers-utils/hooks' // [!code ++]
import { isProvider } from 'feathers-utils/predicates' // [!code ++]
import { omit } from 'feathers-utils/transformers' // [!code ++]

app.service('users').hooks({
  after: {
    all: [
      iff(isProvider('external'), discard('password')) // [!code --]
      iff(isProvider('external'), transformResult((item) => omit(item, ['password']))) // [!code ++]
    ]
  }
})
```
