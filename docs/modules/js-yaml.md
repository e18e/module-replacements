---
description: Modern alternatives to js-yaml for YAML parsing and stringifying
---

# Replacements for `js-yaml`

`js-yaml` appears to be unmaintained and has known spec-compliance issues.

## `yaml`

[`yaml`](https://github.com/eemeli/yaml) is a well maintained YAML 1.2/1.1 parser/stringifier with better spec compliance, comment/AST support, and no deps.

Parse (load):

```diff
- import yaml from 'js-yaml'
+ import { parse } from 'yaml'

- const obj = yaml.load(src)
+ const obj = parse(src)
```

Stringify (dump):

```diff
- import yaml from 'js-yaml'
+ import { stringify } from 'yaml'

- const text = yaml.dump(obj)
+ const text = stringify(obj)
```

Multi-document:

```diff
- import yaml from 'js-yaml'
+ import { parseAllDocuments } from 'yaml'

- const out: any[] = []
- yaml.loadAll(src, (d) => out.push(d))
+ const out = parseAllDocuments(src).map((d) => d.toJSON())
```

## Bun `YAML` API

[Native YAML parsing](https://bun.com/docs/runtime/yaml) is supported in Bun since [v1.2.21](https://bun.com/blog/release-notes/bun-v1.2.21#native-yaml-support).

Example:

```diff
- import yaml from 'js-yaml'
+ import { YAML } from 'bun'

- yaml.load(src)
+ YAML.parse(src)
```
