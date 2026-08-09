---
description: Modern alternatives to the cross-spawn package for spawning child processes
---

# Replacements for `cross-spawn`

> [!NOTE]
> If your application does not need to support Windows, you can likely drop `cross-spawn` entirely as it solely exists to provide Windows spawn compatibility. You can use the built-in `node:child_process` in that case.

## `tinyexec`

[`tinyexec`](https://github.com/tinylibs/tinyexec) is a minimal, dependency-free process execution library.

`cross-spawn` follows the Node.js `spawn` API and returns a `ChildProcess`. In comparison, `tinyexec` returns an awaitable result containing the process output and exit code.

Example:

```ts
import spawn from 'cross-spawn' // [!code --]
import { x } from 'tinyexec' // [!code ++]

const child = spawn('npm', ['list', '-g']) // [!code --]
const { stdout, exitCode } = await x('npm', ['list', '-g']) // [!code ++]

child.stdout?.on('data', (output) => console.log(output.toString())) // [!code --]
console.log(stdout, exitCode) // [!code ++]
```
