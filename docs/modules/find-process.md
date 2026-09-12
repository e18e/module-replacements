---
description: Modern alternatives to the find-process package for looking up running processes
---

# Replacements for `find-process`

## `find-proc`

[`find-process`](https://github.com/yibn2008/find-process) pulls in 8 dependencies and 536 kB install size. [`find-proc`](https://github.com/gameroman-npm/find-proc) does the same job with no dependencies at 16 kB.

In v0.1.0, `find-proc` keeps the same `find(by, value)` signature, for future breaking changes please refer to changelog in `find-proc` repo.

```ts
import find from 'find-process' // [!code --]
import find from 'find-proc' // [!code ++]

const list = await find('port', 80)
```
