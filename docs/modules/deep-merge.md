---
description: Modern alternatives to the @75lb/deep-merge package for deep merging objects
---

# Replacements for `@75lb/deep-merge`

## `defu`

If you need to deep merge two objects, you can use [`defu`](https://github.com/unjs/defu):

```ts
import { defu } from 'defu'

const options = defu(object, ...defaults)
```
