# module-replacements

As part of the community [e18e](https://e18e.dev) effort, this project
provides a collection of module replacements (i.e. possible alternative
packages).

We provide two things:

- Manifests (mappings of modules to their possible replacements)
- Documentation for more complex replacements

## List of replacements

You can find a list of replacements on the [e18e website](https://e18e.dev/docs/replacements/).

## Tools

Some tools consume the lists of modules in this repository:

| Name                                                                       | Description                                   |
| -------------------------------------------------------------------------- | --------------------------------------------- |
| [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend) | ESLint plugin to detect possible replacements |
| [@e18e/eslint-plugin](https://github.com/e18e/eslint-plugin)               | Official e18e ESLint plugin                   |
| [npmx](https://npmx.dev)                                                   | Alternative npm frontend                      |

## Manifests

The manifests can be used via the `module-replacements` npm package.

We provide three manifests:

- All (includes every manifest)
- Native replacements
- Micro utility replacements
- Preferred replacements

### Usage

You can install this package via npm:

```sh
npm i -S module-replacements
```

You can then import the manifest of your choice:

```ts
import {nativeReplacements} from 'module-replacements';
```

The manifests are also available directly in the `manifests/` directory
of the package (e.g. `node_modules/module-replacements/manifests/native.json`).

### Native replacements (`nativeReplacements`, `native.json`)

These are modules which can now be replaced by native functionality.

For example, pseudo-polyfills which provide functionality of widely available
platform features can be replaced by their platform equivalents.

Similarly, features which did not exist at the time but have now existed in
the platform for many years, so no longer need a dependency.

### Micro utility replacements (`microUtilsReplacements`, `micro-utilities.json`)

This is a more opinionated list of modules considered to be 'micro utilities' -
very small utilities which could possibly be replaced with native equivalents
or removed entirely.

### Preferred replacements (`preferredReplacements`, `preferred.json`)

This is a very opinionated list of modules with preferred replacements. Often
these replacements are much lighter or more modern than the modules they are
replacing.

Sometimes these may also be actively maintained forks of older, unmaintained
source packages.

# Contributing

If you would like to add a replacement mapping to one of the manifests, please
open an issue where this can be discussed.

Keep in mind, very newly available native features are unlikely to join the
list since they are not widely available yet.

## Sponsors

<p align="center">
  <a href="https://e18e.dev/sponsor">
    <img src="https://e18e.dev/sponsors.svg" alt="e18e community sponsors" />
  </a>
</p>
