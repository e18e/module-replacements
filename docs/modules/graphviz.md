---
description: Modern alternatives to the graphviz package
---

# Replacements for `graphviz`

## `ts-graphviz`

[`ts-graphviz`](https://github.com/ts-graphviz/ts-graphviz) is an actively maintained graphviz implementation in pure TypeScript.

Example:

```ts
import {
  attribute as _,
  Digraph,
  Subgraph,
  Node,
  Edge,
  toDot
} from 'ts-graphviz'

const G = new Digraph()
const A = new Subgraph('A')
const node1 = new Node('node1', {
  [_.color]: 'red'
})
const node2 = new Node('node2', {
  [_.color]: 'blue'
})
const edge = new Edge([node1, node2], {
  [_.label]: 'Edge Label',
  [_.color]: 'pink'
})
G.addSubgraph(A)
A.addNode(node1)
A.addNode(node2)
A.addEdge(edge)
const dot = toDot(G)
// digraph {
//   subgraph "A" {
//     "node1" [
//       color = "red",
//     ]
//     "node2" [
//       color = "blue",
//     ]
//     "node1" -> "node2" [
//       label = "Edge Label",
//       color = "pink",
//     ]
//   }
// }
```
