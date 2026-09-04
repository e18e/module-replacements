---
description: Native Node.js alternatives to the source-map-support package for mapping stack traces back to original sources
---

# Replacements for `source-map-support` / `@cspotcode/source-map-support`

Node.js maps stack traces back to their original sources on its own, so transpiled code no longer needs [`source-map-support`](https://github.com/evanw/node-source-map-support) to get readable traces.

Two things to keep in mind when migrating:

- The three ways to turn it on do not cover the same files. `--enable-source-maps` and `process.setSourceMapsEnabled(true)` include `node_modules` and generated code, while `module.setSourceMapsSupport(true)` excludes both unless you ask for them.
- Native support is Node-only. `source-map-support` also ran in browsers and let you supply your own file and map loaders, and nothing built in replaces that.

## `module.setSourceMapsSupport` (native, since Node.js v23.7.0 / v22.14.0)

[`module.setSourceMapsSupport`](https://nodejs.org/api/module.html#modulesetsourcemapssupportenabled-options) is the replacement for calling `install()` or importing the register hook. It is the form worth reaching for, because it states which files it covers instead of relying on a default.

```ts
require('source-map-support').install() // [!code --]
import { setSourceMapsSupport } from 'node:module' // [!code ++]

setSourceMapsSupport(true, { nodeModules: true, generatedCode: true }) // [!code ++]
```

The register import maps the same way:

```ts
import 'source-map-support/register' // [!code --]
import { setSourceMapsSupport } from 'node:module' // [!code ++]

setSourceMapsSupport(true, { nodeModules: true, generatedCode: true }) // [!code ++]
```

Pass `nodeModules: true` if you publish compiled code. It defaults to `false`, and without it your consumers' traces stop being mapped at the package boundary, which is a behaviour change from `source-map-support`. `generatedCode: true` covers frames from `eval` and `new Function`.

Only files loaded after the call are covered, so run it before importing the code you want mapped.

## `--enable-source-maps` (native, since Node.js v12.12.0)

When you control how the process starts, the [`--enable-source-maps`](https://nodejs.org/api/cli.html#--enable-source-maps) flag needs no code at all. It has been stable since v15.11.0 / v14.18.0, and it covers `node_modules` and generated code.

```bash
node -r source-map-support/register index.js # [!code --]
node --enable-source-maps index.js # [!code ++]
```

Through the environment instead, which is useful when the command is not yours to edit:

```bash
NODE_OPTIONS="--enable-source-maps" node index.js
```

## `process.setSourceMapsEnabled` (native, since Node.js v16.6.0 / v14.18.0)

[`process.setSourceMapsEnabled`](https://nodejs.org/api/process.html#processsetsourcemapsenabledval) is the smallest change from `install()` and reaches back further than `module.setSourceMapsSupport`.

```ts
require('source-map-support').install() // [!code --]
process.setSourceMapsEnabled(true) // [!code ++]
```

It currently covers `node_modules` and generated code, matching the flag. Node has said in the source that it intends to stop doing so in a future major, so prefer `module.setSourceMapsSupport` with explicit options where the version allows.

## `module.findSourceMap` (native, since Node.js v13.7.0 / v12.17.0)

[`module.findSourceMap`](https://nodejs.org/api/module.html#modulefindsourcemappath) does a different job from everything above. It hands back the parsed source map for a file so you can look positions up yourself, and it never touches a stack trace. Reach for it when you were using `source-map-support` to resolve positions rather than to fix traces.

```ts
import { findSourceMap } from 'node:module'

const sourceMap = findSourceMap('/path/to/file.js')
const entry = sourceMap?.findEntry(lineNumber, columnNumber)
```

## What native support does not cover

Stay on the package if you depend on any of these:

- `environment: 'browser'`. Native support is part of the Node runtime and has no browser equivalent.
- `retrieveSourceMap` and `retrieveFile`. There is no built-in way to supply your own map or file loader, so sources fetched over the network or from a virtual filesystem are out of reach.

## `@cspotcode/source-map-support`

You almost certainly did not install [`@cspotcode/source-map-support`](https://github.com/cspotcode/node-source-map-support) yourself. It is a fork that arrives as a dependency of `ts-node`, and it leaves when `ts-node` does, so there is nothing to swap by hand. If you do depend on it directly, the native APIs above apply to it exactly as they do to the original.
