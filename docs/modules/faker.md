---
description: Modern replacements for the unmaintained faker package generating massive amounts of fake (but realistic) data
---

# Replacements for `faker`

## `@faker-js/faker`

[`@faker-js/faker`](https://github.com/faker-js/faker) is a direct, community‑maintained fork of `faker` with new features, bugfixes, modern ESM/CJS builds, and updated data/locales.

```diff
- const faker = require('faker')
+ const { faker } = require('@faker-js/faker')

  faker.datatype.boolean()

  faker.image.avatar()
```
