---
description: Native alternatives to the collection-map package
---

# Replacements for `collection-map`

## Objects

<!-- prettier-ignore -->
```js
const map = require('collection-map') // [!code --]
const data = { a: 'foo', b: 'bar', c: 'baz' }

// Mapping values
const res = map(data, (item) => item) // [!code --]
const res = Object.values(data).map((item) => item) // [!code ++]

// Mapping keys
const res = map(data, (item, key) => key) // [!code --]
const res = Object.keys(data).map((key) => key) // [!code ++]

// Mapping keys and values
const res = map(data, (item, key) => fn(item, key)) // [!code --]
const res = Object.fromEntries( // [!code ++]
  Object.entries(data).map(([key, value]) => fn(value, key)) // [!code ++]
) // [!code ++]
```

## Arrays

```js
const map = require('collection-map') // [!code --]
const data = ['foo', 'bar', 'baz']

// Mapping items
const res = map(data, (item) => item) // [!code --]
const res = data.map((item) => item) // [!code ++]

// Mapping indices
const res = map(data, (item, index) => index) // [!code --]
const res = data.map((_, index) => index) // [!code ++]

// Mapping items indices
const res = map(data, (item, index) => fn(item, index)) // [!code --]
const res = data.map((item, index) => fn(item, index)) // [!code ++]
```

## Property Strings

When passing a string to extract a specific property, use a standard map with property access.

```js
const map = require('collection-map') // [!code --]

const obj = {
  a: { aaa: 'one', bbb: 'four', ccc: 'seven' },
  b: { aaa: 'two', bbb: 'five', ccc: 'eight' },
  c: { aaa: 'three', bbb: 'six', ccc: 'nine' }
}

// Objects: Map values to property
map(obj, 'aaa') // [!code --]
Object.values(obj).map((item) => item.aaa) // [!code ++]

// Arrays: Map items to property
const array = [obj.a, obj.b, obj.c]
map(array, 'bbb') // [!code --]
array.map((item) => item.bbb) // [!code ++]
```

## `thisArg` (Context)

Native `.map()` supports a second argument for `thisArg`.

<!-- prettier-ignore -->
```js
const map = require('collection-map') // [!code --]

const array = ['a', 'b', 'c']
const ctx = { a: 'aaa', b: 'bbb', c: 'ccc' }

const res = map(array, function(item) { // [!code --]
const res = array.map(function(item) { // [!code ++]
  return this[item]
}, ctx)
```
