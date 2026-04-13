---
description: Modern alternatives to the execa package for running child processes
---

# Replacements for `execa`

## `tinyexec`

[`tinyexec`](https://github.com/tinylibs/tinyexec) is a minimal process execution library.

Example:

```diff
- import { execa } from 'execa'
+ import { x } from 'tinyexec'

- const { stdout } = await execa('ls', ['-l'])
+ const { stdout } = await x('ls', ['-l'], { throwOnError: true })
```

## `nanoexec`

If you prefer a very thin wrapper over `child_process.spawn` (including full spawn options and optional shell), [`nanoexec`](https://github.com/fabiospampinato/nanoexec) is another light alternative. Its `stdout`/`stderr` are Buffers.

Example:

```diff
- import { execa } from 'execa'
+ import exec from 'nanoexec'

- const { stdout } = await execa('echo', ['example'])
+ const res = await exec('echo', ['example'])
+ const stdout = res.stdout.toString('utf8')
```

## Bun

If you’re on Bun, its built-in [`$`](https://bun.com/reference/bun/$) template tag can replace `execa`’s script-style usage:

Example:

```diff
- import { $ } from 'execa'
+ import { $ } from 'bun'

- const { stdout } = await $`echo "Hello"`
+ const stdout = await $`echo "Hello"`.text()
```
