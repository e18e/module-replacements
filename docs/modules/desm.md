---
description: Native alternatives to the desm package
---

# Replacements for `desm`

## `import.meta.dirname` and `import.meta.filename`

```ts
import { join } from 'desm' // [!code --]
import { join } from 'node:path' // [!code ++]

join('./foo.ts') // [!code --]
join(import.meta.dirname, './foo.ts') // [!code ++]
```

```ts
import { dirname } from 'desm' // [!code --]

dirname(import.meta.url) // [!code --]
import.meta.dirname // [!code ++]
```

```ts
import { filename } from 'desm' // [!code --]

filename(import.meta.url) // [!code --]
import.meta.filename // [!code ++]
```
