---
description: Modern alternatives to the inherits package
---

# Replacements for `inherits`

## ES6 classes `extends` syntax

ES6 classes [`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) syntax is a native way to implement prototype inheritance.

Example:

<!-- prettier-ignore -->
```js
import EventEmitter from 'node:events'
import inherits from 'inherits' // [!code --]

function MyStream() { // [!code --]
  EventEmitter.call(this) // [!code --]
} // [!code --]

MyStream.prototype.write = function (data) { // [!code --]
  this.emit('data', data) // [!code --]
} // [!code --]

inherits(MyStream, EventEmitter) // [!code --]

class MyStream extends EventEmitter { // [!code ++]
  write(data) { // [!code ++]
    this.emit('data', data) // [!code ++]
  } // [!code ++]
} // [!code ++]

const stream = new MyStream()

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`)
})
stream.write('Hello world!')
```

## `utils.inherits` (native, since Node.js v5.0.0)

[`utils.inherits`](https://nodejs.org/docs/latest/api/util.html#utilinheritsconstructor-superconstructor) is a native legacy Node.js api.

Example:

```js
import inherits from 'inherits' // [!code --]
import { inherits } from 'node:util' // [!code ++]

inherits(Target, Base)
```

## `Object.create` (native)

[`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) allows you to implement inheritance.

Example:

<!-- prettier-ignore -->
```js
import inherits from 'inherits' // [!code --]

inherits(Target, Base) // [!code --]

Target.prototype = Object.create(Base.prototype, { // [!code ++]
  constructor: { // [!code ++]
    value: Target, // [!code ++]
    enumerable: false, // [!code ++]
    writable: true, // [!code ++]
    configurable: true // [!code ++]
  } // [!code ++]
}) // [!code ++]
```
