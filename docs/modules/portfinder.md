---
description: Modern alternatives to the portfinder package for finding an available port
---

# Replacements for `portfinder`

## `get-port`

[`get-port`](https://github.com/sindresorhus/get-port) is a lighter and more modern package for finding an available port.

Example:

```ts
import portfinder from 'portfinder' // [!code --]
import getPort from 'get-port' // [!code ++]

const port = await portfinder.getPortPromise() // [!code --]
const port = await getPort() // [!code ++]
```
