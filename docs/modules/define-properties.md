---
description: Native alternatives to the define-properties package for defining multiple object properties
---

# Replacements for `define-properties`

## `Object.defineProperties` (native)

[`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) can define multiple properties on an object without an extra dependency.

Example:

```ts
import defineProperties from 'define-properties' // [!code --]

const obj = {}
const descriptors = {
  enabled: {
    configurable: true,
    enumerable: false,
    value: true,
    writable: false
  }
}

defineProperties(obj, { enabled: true }) // [!code --]
Object.defineProperties(obj, descriptors) // [!code ++]
```

`define-properties` also skips existing properties unless a matching predicate returns `true`. If your code relies on that behavior, keep the condition outside the descriptor map when migrating:

```ts
import defineProperties from 'define-properties' // [!code --]

const descriptors = {
  enabled: {
    configurable: true,
    enumerable: false,
    value: true,
    writable: false
  }
}

defineProperties(obj, { enabled: true }, { enabled: shouldOverrideEnabled }) // [!code --]
if (!Object.hasOwn(obj, 'enabled') || shouldOverrideEnabled()) {
  // [!code ++]
  Object.defineProperties(obj, descriptors) // [!code ++]
}
```
