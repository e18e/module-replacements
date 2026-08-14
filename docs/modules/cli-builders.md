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

## `cleye`

[`cleye`](https://github.com/privatenumber/cleye) is another powerful tool for building CLI applications for Node.js

```ts
import { cli } from 'cleye'

// Parse argv
const argv = cli({
  name: 'greet.js',

  // Define parameters
  parameters: [
    '<first name>', // First name is required
    '[last name]' // Last name is optional
  ],

  // Define flags/options
  flags: {
    // Parses `--time` as a string
    time: {
      type: String,
      description: 'Time of day to greet (morning or evening)',
      default: 'morning'
    }
  }
})

const name = [argv._.firstName, argv._.lastName].filter(Boolean).join(' ')

if (argv.flags.time === 'morning') {
  console.log(`Good morning ${name}!`)
} else {
  console.log(`Good evening ${name}!`)
}
```

## `cac`

[`cac`](https://github.com/cacjs/cac) is a simple yet powerful framework for building CLI applications for Node.js

```ts
import cac from 'cac'

const cli = cac()

cli
  .command('deploy <folder>', 'Deploy a folder to AWS')
  .option('--scale [level]', 'Scaling level')
  .action((folder, options) => {
    // ...
  })

cli
  .command('build [project]', 'Build a project')
  .option('--out <dir>', 'Output directory')
  .action((folder, options) => {
    // ...
  })

cli.parse()
```

## Argument parsers

If you only need an argument parser, check the [argument parsers page](https://e18e.dev/docs/replacements/parseargs).
