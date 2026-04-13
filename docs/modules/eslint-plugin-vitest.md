---
description: Modern alternatives to the eslint-plugin-vitest package for Vitest-specific linting rules
---

# Replacements for `eslint-plugin-vitest`

## `@vitest/eslint-plugin`

[`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest) is the same project as `eslint-plugin-vitest` but re-published under a different name. `eslint-plugin-vitest` is no longer maintained because the [original maintainer has lost access to their old npm account](https://github.com/vitest-dev/eslint-plugin-vitest/issues/537).

```diff
+ import vitest from '@vitest/eslint-plugin'
- import vitest from 'eslint-plugin-vitest'

  export default [
    {
      files: ['tests/**'], // or any other pattern
      plugins: {
        vitest
      },
      rules: {
        ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
        'vitest/max-nested-describe': ['error', { max: 3 }] // you can also modify rules' behavior using option like this
      }
    }
  ]
```
