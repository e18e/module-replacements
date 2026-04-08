---
description: Modern alternatives to packages for deep merging objects
---

# Replacements to packages for deep merging objects

## `defu`

If you need to deep merge two objects, you can use [`defu`](https://github.com/unjs/defu):

```ts
import { defu } from 'defu'

const options = defu(object, ...defaults)
```
