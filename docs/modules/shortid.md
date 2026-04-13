---
description: Modern, secure alternatives to the shortid package for generating URL‑friendly unique IDs
---

# Replacements for `shortid`

## `nanoid`

[`nanoid`](https://github.com/ai/nanoid) is a tiny, secure, URL‑friendly, unique string ID generator. It’s also faster than [`shortid`](https://github.com/dylang/shortid).

> [!NOTE]
> **Good to know before migration**
>
> - `shortid.isValid(id)`: there’s no direct equivalent. Validate with a regex that matches your chosen alphabet and length, e.g. `/^[A-Za-z0-9_-]{21}$/`.
> - `shortid.seed()`/`shortid.worker()`: not needed and not provided by `nanoid` (it uses a secure random source). Avoid seeded/deterministic IDs for security.

### Basic migration

```diff
- import shortid from 'shortid'
+ import { nanoid } from 'nanoid'

- const id = shortid.generate()
+ const id = nanoid() // => "V1StGXR8_Z5jdHi6B-myT"
```

### Control length

```ts
// shortid produced ~7-14 chars; with nanoid you pick the size explicitly:
nanoid(10) // e.g., "NG3oYbq9qE"
```

### Custom alphabet (replacement for `shortid.characters`)

<!-- eslint-skip -->
<!-- prettier-ignore -->
```diff
- shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
+ import { customAlphabet } from 'nanoid'
  
+ const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
+ const makeId = customAlphabet(alphabet, 12)
+ const id = makeId()
```
