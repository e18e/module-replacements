---
description: Modern alternatives to the portfinder package for finding an available port
---

# Replacements for `portfinder`

## `get-port`

[`get-port`](https://github.com/lukeed/get-port) provides a more generic way to find files and directories upwards.

Example:

```ts
import portfinder from 'portfinder' // [!code --]
import getPort from 'get-port' // [!code ++]

const port = await portfinder.getPortPromise() // [!code --]
const port = await getPort() // [!code ++]
```
