---
description: Modern alternatives to toml for TOML parsing and stringifying
---

# Replacements for `toml`

`toml` appears to be unmaintained and has known spec-compliance issues.

## `smol-toml`

[`smol-toml`](https://github.com/squirrelchat/smol-toml) is a well maintained TOML v1.1.0 parser/stringifier with full spec compliance, comment/AST support, and no deps.

Parse (load):

```diff
- import toml from 'toml'
+ import { parse } from 'smol-toml'

- const obj = toml.parse(src)
+ const obj = parse(src)
```

Stringify:

```ts
import { stringify } from 'smol-toml'

const text = stringify(obj)
```

## Bun `TOML` API (native)

[Native TOML parsing](https://bun.com/docs/runtime/toml#runtime-api) is supported in Bun.

Example:

```diff
- import toml from 'toml'
+ import { TOML } from 'bun'

- toml.parse(src)
+ TOML.parse(src)
```
