---
description: Modern alternatives to the inherits package
---

# Replacements for `inherits`

## ES6 classes `extends` syntax

ES6 classes `extends` syntax is a native way to implement prototype inheritance.

Example:

<!-- prettier-ignore -->
```diff
  import EventEmitter from 'node:events'
- import inherits from 'inherits'
  
- function MyStream() {
-   EventEmitter.call(this)
- }
  
- MyStream.prototype.write = function (data) {
-   this.emit('data', data)
- }
  
- inherits(MyStream, EventEmitter)
  
+ class MyStream extends EventEmitter {
+   write(data) {
+     this.emit('data', data)
+   }
+ }
  
  const stream = new MyStream()
  
  stream.on('data', (data) => {
    console.log(`Received data: "${data}"`)
  })
  stream.write('Hello world!')
```

## `utils.inherits` (native, since Node.js v5.0.0)

[`utils.inherits`](https://nodejs.org/docs/latest/api/util.html#utilinheritsconstructor-superconstructor) is a native legacy Node.js api.

Example:

```diff
- import inherits from 'inherits'
+ import { inherits } from 'node:util'

  inherits(Target, Base)
```

## `Object.create` (native)

[`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) allows you to implement inheritance.

Example:

<!-- prettier-ignore -->
```diff
- import inherits from 'inherits'
  
- inherits(Target, Base)
  
+ Target.prototype = Object.create(Base.prototype, {
+   constructor: {
+     value: Target,
+     enumerable: false,
+     writable: true,
+     configurable: true
+   }
+ })
```
