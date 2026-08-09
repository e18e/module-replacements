---
description: Modern alternatives to yaml-ast-parser for parsing YAML into an AST
---

# Replacements for `yaml-ast-parser`

## `yaml`

[`yaml`](https://github.com/eemeli/yaml) is an actively maintained YAML parser with support for YAML 1.1 and 1.2, comments, and AST access.

`yaml-ast-parser` returns a `YAMLNode` from `load`. With `yaml`, use `parseDocument` and access the root node through `document.contents`.

Example:

```ts
import { load } from 'yaml-ast-parser' // [!code --]
import { parseDocument } from 'yaml' // [!code ++]

const ast = load(source) // [!code --]
const document = parseDocument(source) // [!code ++]
const ast = document.contents // [!code ++]
```

The AST node types differ between the two packages, so code that traverses or modifies nodes will need to use the node APIs provided by `yaml`.
