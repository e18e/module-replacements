---
description: Modern alternatives to the find-process package for looking up running processes
---

# Replacements for `find-process`

## `find-proc`

[`find-process`](https://github.com/yibn2008/find-process) pulls in 8 dependencies for a 908 kB install. [`find-proc`](https://github.com/gameroman-npm/find-proc) does the same job with no dependencies at 36 kB, and keeps the same `find(by, value)` signature, so in most cases only the import needs to change:

```ts
import find from 'find-process' // [!code --]
import find from 'find-proc' // [!code ++]

const list = await find('port', 80)
```
