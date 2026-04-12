---
description: Modern alternatives to the npm-run-all package for running multiple npm scripts
---

# Replacements for `npm-run-all`

## `npm-run-all2`

[npm-run-all2](https://github.com/bcomnes/npm-run-all2) is an actively maintained fork with important fixes, dependency updates.

```json
{
  "scripts": {
    "build": "npm-run-all clean lint compile"
  }
}
```

The commands remain the same: `npm-run-all`, `run-s`, and `run-p`.

## `concurrently`

Another option is [concurrently](https://github.com/open-cli-tools/concurrently), which focuses on running scripts in parallel with colored output and process control. It uses a slightly different syntax but works well for replacing the `--parallel` use case.

```json
{
  "scripts": {
    "dev": "npm-run-all --parallel \"watch-*\" start", // [!code --]
    "dev": "concurrently \"npm:watch-*\" \"npm:start\"" // [!code ++]
  }
}
```

## `wireit`

For more advanced workflows, consider [Wireit](https://github.com/google/wireit). It integrates directly into `package.json` to add caching, dependency graphs, watch mode, and incremental builds. Unlike `npm-run-all`, Wireit upgrades your existing `npm run` experience instead of providing a separate CLI.

```json
{
  "scripts": {
    "build": "wireit",
    "compile": "wireit",
    "bundle": "wireit"
  },
  "wireit": {
    "build": {
      "dependencies": ["compile", "bundle"]
    },
    "compile": {
      "command": "tsc",
      "files": ["src/**/*.ts"],
      "output": ["lib/**"]
    },
    "bundle": {
      "command": "rollup -c",
      "dependencies": ["compile"],
      "files": ["rollup.config.js"],
      "output": ["dist/**"]
    }
  }
}
```

## `bun run --parallel` / `bun run --sequential`

If you are using bun you can use [`bun run --parallel`](https://bun.com/docs/runtime#param-parallel) and [`bun run --sequential`](https://bun.com/docs/runtime#param-sequential).

### Parallel

```json
{
  "scripts": {
    "dev": "npm-run-all --parallel \"dev:*\"", // [!code --]
    "dev": "bun run --parallel dev:*" // [!code ++]
  }
}
```

### Sequential

```json
{
  "scripts": {
    "build": "run-s clean lint compile", // [!code --]
    "build": "bun run --sequential clean lint compile" // [!code ++]
  }
}
```
