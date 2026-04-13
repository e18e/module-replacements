---
description: Modern alternatives to the portfinder package for finding an available port
---

# Replacements for `portfinder`

## `get-port`

[`get-port`](https://github.com/sindresorhus/get-port) is a lighter and more modern package for finding an available port.

Example:

```diff
- import portfinder from 'portfinder'
+ import getPort from 'get-port'

- const port = await portfinder.getPortPromise()
+ const port = await getPort()
```
