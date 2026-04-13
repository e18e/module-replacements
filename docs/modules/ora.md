---
description: Modern alternatives to the ora package for displaying elegant terminal spinners with status indicators
---

# Replacements for `ora`

## `nanospinner`

[`nanospinner`](https://github.com/usmanyunusov/nanospinner) provides simple start/success/error/warning methods with one dependency (`picocolors`).

```diff
- import ora from 'ora'
+ import { createSpinner } from 'nanospinner'

- const spinner = ora('Loading...').start()
+ const spinner = createSpinner('Loading...').start()

- spinner.succeed('Done!')
+ spinner.success('Done!')

- spinner.fail('Error!')
+ spinner.error('Error!')
```

## `picospinner`

[`picospinner`](https://github.com/tinylibs/picospinner) has zero dependencies with support for custom symbols, frames, and colors through Node.js built-in styling.

```diff
- import ora from 'ora'
+ import { Spinner } from 'picospinner'

- const spinner = ora('Loading...').start()
+ const spinner = new Spinner('Loading...')
+ spinner.start()
```

If you want to customize the color of the spinner, you can specify this when creating an instance:

```ts
const spinner = new Spinner('Loading...', { colors: { spinner: 'yellow' } })
```
