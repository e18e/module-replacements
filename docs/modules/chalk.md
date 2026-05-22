---
description: Modern alternatives to the chalk package for terminal string styling and colors, with notes on browser console support
---

# Replacements for `chalk`

## `styleText` (native)

Since Node 20.x, you can use the [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text-options) function from the `node:util` module to style text in the terminal.

> [!TIP]
> Node.js provides a codemod which can migrate some of this automatically, see the docs at [@nodejs/chalk-to-util-styletext](https://app.codemod.com/registry/@nodejs/chalk-to-util-styletext) for more details.

Example:

```ts
import { styleText } from 'node:util' // [!code ++]
import chalk from 'chalk' // [!code --]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${styleText('blue', 'blue')} world!`) // [!code ++]
console.log(`I am ${chalk.hex('#ec8f5e')('hex color')}!`) // [!code --]
console.log(`I am ${styleText('#ec8f5e', 'hex color')}!`) // [!code ++]
```

When using multiple styles, you can pass an array to `styleText`:

```ts
console.log(`I am ${chalk.blue.bgRed('blue on red')}!`) // [!code --]
console.log(`I am ${styleText(['blue', 'bgRed'], 'blue on red')}!`) // [!code ++]
```

> [!NOTE]
> Before Node v26.1.0, `styleText` did not support hex colors or RGB colors (e.g. `#EFEFEF` or `255, 239, 235`). Hex colors are supported starting in v26.1.0, but RGB colors are still not supported. You can view the available styles in the [Node documentation](https://nodejs.org/api/util.html#modifiers).

## `picocolors`

[`picocolors`](https://github.com/alexeyraspopov/picocolors) follows a similar API but without chaining:

```ts
import chalk from 'chalk' // [!code --]
import picocolors from 'picocolors' // [!code ++]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${picocolors.blue('blue')} world!`) // [!code ++]

// A chained example
console.log(chalk.blue.bgRed('blue on red')) // [!code --]
console.log(picocolors.blue(picocolors.bgRed('blue on red'))) // [!code ++]
```

> [!NOTE]
> `picocolors` currently does not support RGB and hex colors (e.g. `#EFEFEF` or `255, 239, 235`).

## `ansis`

[`ansis`](https://github.com/webdiscus/ansis/) supports a chaining syntax similar to chalk and supports both RGB, and hex colors.

Example:

```ts
import ansis from 'ansis' // [!code ++]
import chalk from 'chalk' // [!code --]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${ansis.blue('blue')} world!`) // [!code ++]
```

When using multiple styles, you can chain them just like in chalk:

```ts
console.log(chalk.blue.bgRed('blue on red')) // [!code --]
console.log(ansis.blue.bgRed('blue on red')) // [!code ++]
```

Similarly, you can use RGB and hex colors:

```ts
console.log(chalk.rgb(239, 239, 239)('Hello world!')) // [!code --]
console.log(ansis.rgb(239, 239, 239)('Hello world!')) // [!code ++]
```

## Browser support

While these libraries are primarily designed for terminal output, some projects may need colored output in browser environments.

Following [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output), the native approach is `%c` directive in `console.log`:

```ts
console.log(
  'Hello %ce%c1%c8%ce',
  'color: #ec8f5e;',
  'color: #f2ca60;',
  'color: #bece57;',
  'color: #7bb560;',
  'Ecosystem Performance'
)
```

Library support:

- [`ansis`](https://github.com/webdiscus/ansis#browser-compatibility-for-ansi-codes) - colors are supported in _Chromium_ browsers
- `picocolors` - strips colors in browser environments
- `node:util` - is not available in browsers
