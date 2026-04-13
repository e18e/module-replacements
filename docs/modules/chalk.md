---
description: Modern alternatives to the chalk package for terminal string styling and colors, with notes on browser console support
---

# Replacements for `chalk`

## `styleText` (native)

Since Node 20.x, you can use the [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text-options) function from the `node:util` module to style text in the terminal.

Example:

```diff
+ import { styleText } from 'node:util'
- import chalk from 'chalk'

- console.log(`Hello ${chalk.blue('blue')} world!`)
+ console.log(`Hello ${styleText('blue', 'blue')} world!`)
```

When using multiple styles, you can pass an array to `styleText`:

```diff
- console.log(`I am ${chalk.blue.bgRed('blue on red')}!`)
+ console.log(`I am ${styleText(['blue', 'bgRed'], 'blue on red')}!`)
```

> [!NOTE]
> `styleText` does not support RGB and hex colors (e.g. `#EFEFEF` or `255, 239, 235`). You can view the available styles in the [Node documentation](https://nodejs.org/api/util.html#modifiers).

## `picocolors`

[`picocolors`](https://github.com/alexeyraspopov/picocolors) follows a similar API but without chaining:

```diff
- import chalk from 'chalk'
+ import picocolors from 'picocolors'

- console.log(`Hello ${chalk.blue('blue')} world!`)
+ console.log(`Hello ${picocolors.blue('blue')} world!`)

  // A chained example
- console.log(chalk.blue.bgRed('blue on red'))
+ console.log(picocolors.blue(picocolors.bgRed('blue on red')))
```

> [!NOTE]
> `picocolors` currently does not support RGB and hex colors (e.g. `#EFEFEF` or `255, 239, 235`).

## `ansis`

[`ansis`](https://github.com/webdiscus/ansis/) supports a chaining syntax similar to chalk and supports both RGB, and hex colors.

Example:

```diff
+ import ansis from 'ansis'
- import chalk from 'chalk'

- console.log(`Hello ${chalk.blue('blue')} world!`)
+ console.log(`Hello ${ansis.blue('blue')} world!`)
```

When using multiple styles, you can chain them just like in chalk:

```diff
- console.log(chalk.blue.bgRed('blue on red'))
+ console.log(ansis.blue.bgRed('blue on red'))
```

Similarly, you can use RGB and hex colors:

```diff
- console.log(chalk.rgb(239, 239, 239)('Hello world!'))
+ console.log(ansis.rgb(239, 239, 239)('Hello world!'))
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
