---
description: Modern alternatives to the globby package for globbing and .gitignore support
---

# Replacements for `globby`

## `tinyglobby`

[`globby`](https://github.com/sindresorhus/globby) is a convenience wrapper around [`fast-glob`](https://github.com/mrmlnc/fast-glob).

You can follow roughly the same migration process as documented in the [`fast-glob`](./fast-glob.md) replacement guide, since `globby` is built on top of it and the main differences are its extra conveniences.

If you don’t need `.gitignore` handling, prefer [`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby/) - it’s smaller and faster. If you do need `.gitignore` behavior, pair `tinyglobby` with a small git-based helper. For most cases, this will likely be good enough:

```ts
import { execSync } from 'node:child_process'
import process from 'node:process'
import { glob, escapePath } from 'tinyglobby'

async function globWithGitignore(patterns, options = {}) {
  const { cwd = process.cwd(), ...restOptions } = options

  try {
    const gitIgnored = execSync(
      'git ls-files --others --ignored --exclude-standard --directory',
      { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    )
      .split('\n')
      .filter(Boolean)
      .map((p) => escapePath(p))

    return glob(patterns, {
      ...restOptions,
      cwd,
      ignore: [...(restOptions.ignore || []), ...gitIgnored]
    })
  } catch {
    return glob(patterns, options)
  }
}

const paths = await globWithGitignore(['**/*'], { cwd })
```
