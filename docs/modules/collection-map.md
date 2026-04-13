---
description: Native alternatives to the collection-map package
---

# Replacements for `collection-map`

## Objects

<!-- prettier-ignore -->
```diff
- const map = require('collection-map')
  const data = { a: 'foo', b: 'bar', c: 'baz' }
  
  // Mapping values
- const res = map(data, (item) => item)
+ const res = Object.values(data).map((item) => item)
  
  // Mapping keys
- const res = map(data, (item, key) => key)
+ const res = Object.keys(data).map((key) => key)
  
  // Mapping keys and values
- const res = map(data, (item, key) => fn(item, key))
+ const res = Object.fromEntries(
+   Object.entries(data).map(([key, value]) => fn(value, key))
+ )
```

## Arrays

```diff
- const map = require('collection-map')
  const data = ['foo', 'bar', 'baz']

  // Mapping items
- const res = map(data, (item) => item)
+ const res = data.map((item) => item)

  // Mapping indices
- const res = map(data, (item, index) => index)
+ const res = data.map((_, index) => index)

  // Mapping items indices
- const res = map(data, (item, index) => fn(item, index))
+ const res = data.map((item, index) => fn(item, index))
```

## Property Strings

When passing a string to extract a specific property, use a standard map with property access.

```diff
- const map = require('collection-map')

  const obj = {
    a: { aaa: 'one', bbb: 'four', ccc: 'seven' },
    b: { aaa: 'two', bbb: 'five', ccc: 'eight' },
    c: { aaa: 'three', bbb: 'six', ccc: 'nine' }
  }

  // Objects: Map values to property
- map(obj, 'aaa')
+ Object.values(obj).map((item) => item.aaa)

  // Arrays: Map items to property
  const array = [obj.a, obj.b, obj.c]
- map(array, 'bbb')
+ array.map((item) => item.bbb)
```

## `thisArg` (Context)

Native `.map()` supports a second argument for `thisArg`.

<!-- prettier-ignore -->
```diff
- const map = require('collection-map')
  
  const array = ['a', 'b', 'c']
  const ctx = { a: 'aaa', b: 'bbb', c: 'ccc' }
  
- const res = map(array, function(item) {
+ const res = array.map(function(item) {
    return this[item]
  }, ctx)
```
