---
description: Modern alternatives to packages for building CLI applications
---

# Replacements for CLI builders

## `sade`

[`sade`](https://github.com/lukeed/sade) is a small but powerful tool for building CLI applications for Node.js

```ts
import sade from 'sade'

const prog = sade('my-cli')

prog
  .version('1.0.5')
  .option('--global, -g', 'An example global flag')
  .option('-c, --config', 'Provide path to custom config', 'foo.config.js')

prog
  .command('build <src> <dest>')
  .describe('Build the source directory. Expects an `index.js` entry file.')
  .option('-o, --output', 'Change the name of the output file', 'bundle.js')
  .example('build src build --global --config my-conf.js')
  .example('build app public -o main.js')
  .action((src, dest, opts) => {
    console.log(`> building from ${src} to ${dest}`)
    console.log('> these are extra opts', opts)
  })

prog.parse(process.argv)
```
