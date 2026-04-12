---
description: Modern alternatives to the dot-prop package for getting, setting, and deleting nested object properties using dot notation
---

# Replacements for `dot-prop`

## `dlv` and `dset`

[`dlv`](https://github.com/developit/dlv) gets nested values with default fallbacks and [`dset`](https://github.com/lukeed/dset) sets nested values with automatic intermediate object creation.

```ts
import { getProperty, setProperty } from 'dot-prop' // [!code --]
import delve from 'dlv' // [!code ++]
import { dset } from 'dset' // [!code ++]

const value = getProperty(obj, 'foo.bar.baz') // [!code --]
const value = delve(obj, 'foo.bar.baz') // [!code ++]

setProperty(obj, 'foo.bar.baz', 'value') // [!code --]
dset(obj, 'foo.bar.baz', 'value') // [!code ++]
```

## `String.prototype.split` + `Array.prototype.reduce` (native)

If you only need to get a nested value you can use a simple function:

```js
function getProperty(obj, key) {
  return key.split('.').reduce((acc, k) => acc?.[k], obj)
}

const value = getProperty(obj, 'foo.bar.baz')
```

> [!NOTE]
> This assumes that you do not consume dot paths as user input.
> If you do, ensure you sanitize keys before accessing them (e.g. through `Object.hasOwn`).
