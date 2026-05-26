---
description: Modern, maintained alternative to the eslint-config-airbnb shared config
---

# Replacements for `eslint-config-airbnb`

## `eslint-config-airbnb-extended`

[`eslint-config-airbnb-extended`](https://github.com/eslint-config/airbnb-extended) is a more modern, actively maintained successor to [`eslint-config-airbnb`](https://github.com/airbnb/javascript). It supports both JavaScript and TypeScript, and includes rules for React, JSX, and React Hooks, and supports ESLint v9/10 configs.

It consolidates `eslint-config-airbnb-base`, `eslint-config-airbnb`, and `eslint-config-airbnb-typescript` into a single config, only supports flat config (`eslint.config.mjs`), and uses a faster, modern equivalent of the `import` plugin (`eslint-plugin-import-x`).

The upstream project provides an official [migration guide](https://eslint-airbnb-extended.nishargshah.dev/migration/upgrade-to-extended) and a CLI scaffolder to set up a new config.

Note that any rules referencing the old `import/*` plugin will need to be updated to use the `import-x/*` equivalents (e.g. `import/no-unresolved` -> `import-x/no-unresolved`).
