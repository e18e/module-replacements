---
description: Modern alternatives to lint-staged for running commands on staged Git files
---

# Replacements for `lint-staged`

## `nano-staged`

[`nano-staged`](https://github.com/usmanyunusov/nano-staged) is a tiny pre-commit runner for staged (and more) files; much smaller and faster than `lint-staged`, with a simple config.

package.json config:

<!-- eslint-skip -->

```diff
  {
-   "lint-staged": {
+   "nano-staged": {
      "*.{js,ts}": ["prettier --write"]
    },
  }
```

> [!NOTE]
> Differences to be aware of:
>
> - `lint-staged` has advanced features like backup stashing, partial-staging handling, per-directory configs in monorepos, and detailed concurrency controls.
> - `nano-staged` focuses on simplicity and speed. If you rely on `lint-staged`’s stash/partial-staging features, keep using `lint-staged`.
