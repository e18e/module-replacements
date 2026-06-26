---
description: Native alternatives to the define-properties package for defining multiple object properties
---

# Replacements for `define-properties`

## `Object.defineProperties` (native)

[`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) can define multiple properties on an object without an extra dependency.

Example:

```ts
import defineProperties from 'define-properties'

const obj = {}

defineProperties(obj, {
  enabled: true
})

Object.defineProperties(obj, {
  enabled: {
    configurable: true,
    enumerable: false,
    value: true,
    writable: false
  }
})
```

`define-properties` also skips existing properties unless a matching predicate returns `true`. If your code relies on that behavior, keep the condition outside the descriptor map when migrating:

```ts
const descriptors = {
  enabled: {
    configurable: true,
    enumerable: false,
    value: true,
    writable: false
  }
}

if (!Object.hasOwn(obj, 'enabled') || shouldOverrideEnabled()) {
  Object.defineProperties(obj, descriptors)
}
```
