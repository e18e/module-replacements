---
description: Replacements for the npm-check package using package manager built-in commands or taze
---

# Replacements for `npm-check`

## Package manager built-in commands

Modern package managers cover checking for and applying dependency updates out of the box, with no extra dependency.

### npm

```sh
npm outdated
npm update
```

### pnpm

```sh
pnpm outdated
pnpm update --interactive --latest
```

### yarn

```sh
yarn upgrade-interactive
```

### bun

```sh
bun outdated
bun update --interactive
```

## `taze`

If you want more than the built-ins offer (e.g. monorepo-wide updates, grouped output, update modes), [`taze`](https://github.com/antfu-collective/taze) is a modern, smaller alternative to `npm-check`.

```sh
# check for updates
npx taze

# write updates to package.json
npx taze -w

# include major version bumps
npx taze major -w
```

Note that `npm-check`'s unused-dependency detection is not covered by these commands — a dedicated tool such as [`knip`](https://knip.dev) handles that use case.
