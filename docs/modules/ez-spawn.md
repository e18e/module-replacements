---
description: Modern alternatives to the ez-spawn package for spawning child processes
---

# Replacements for `@jsdevtools/ez-spawn`

## `tinyexec`

`ez-spawn` accepts shell-like command strings, which `tinyexec` does not.

For example:

```diff
- import ezSpawn from '@jsdevtools/ez-spawn'
+ import { x } from 'tinyexec'

- await ezSpawn.async('ls -l')
+ await x('ls', ['-l'])
```

Alternatively, you can use [`args-tokenizer`](https://github.com/TrySound/args-tokenizer/) to convert a shell string to a command and arguments:

```diff
- import ezSpawn from '@jsdevtools/ez-spawn'
+ import { tokenizeArgs } from 'args-tokenizer'
+ import { x } from 'tinyexec'

+ const [command, ...args] = tokenizeArgs('ls -l')
- await ezSpawn.async('ls -l')
+ await x(command, args)
```
