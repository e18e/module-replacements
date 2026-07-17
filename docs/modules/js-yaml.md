---
description: Modern alternatives to js-yaml for YAML parsing and stringifying
---

# Replacements for `js-yaml`

`js-yaml` is actively maintained. Alternatives below may still be preferable for comment/AST support, zero dependencies, or Bun-native usage.

## `yaml`

[`yaml`](https://github.com/eemeli/yaml) is a well maintained YAML 1.2/1.1 parser/stringifier with better spec compliance, comment/AST support, and no deps.

Parse (load):

```ts
import yaml from 'js-yaml' // [!code --]
import { parse } from 'yaml' // [!code ++]

const obj = yaml.load(src) // [!code --]
const obj = parse(src) // [!code ++]
```

Stringify (dump):

```ts
import yaml from 'js-yaml' // [!code --]
import { stringify } from 'yaml' // [!code ++]

const text = yaml.dump(obj) // [!code --]
const text = stringify(obj) // [!code ++]
```

Multi-document:

```ts
import yaml from 'js-yaml' // [!code --]
import { parseAllDocuments } from 'yaml' // [!code ++]

const out: any[] = [] // [!code --]
yaml.loadAll(src, (d) => out.push(d)) // [!code --]
const out = parseAllDocuments(src).map((d) => d.toJSON()) // [!code ++]
```

## Bun `YAML` API

[Native YAML parsing](https://bun.com/docs/runtime/yaml) is supported in Bun since [v1.2.21](https://bun.com/blog/release-notes/bun-v1.2.21#native-yaml-support).

Example:

```ts
import yaml from 'js-yaml' // [!code --]
import { YAML } from 'bun' // [!code ++]

yaml.load(src) // [!code --]
YAML.parse(src) // [!code ++]
```
