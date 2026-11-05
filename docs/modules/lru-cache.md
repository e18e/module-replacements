---
description: Modern alternatives to the lru-cache package for in-memory least-recently-used caches
---

# Replacements for `lru-cache`

`lru-cache` publishes several builds of itself, which add up to about 3.3 MB installed, while these alternatives cover the common use cases in under 100 KB.

If you rely on features like `fetchMethod`, `maxSize` with `sizeCalculation`, or stale-while-revalidate, `lru-cache` may still be the better fit.

## `tiny-lru`

[`tiny-lru`](https://github.com/avoidwork/tiny-lru) evicts the least recently used entry exactly like `lru-cache`, and supports a TTL in milliseconds. It ships both ESM and CommonJS builds.

<!-- prettier-ignore -->
```ts
import { LRUCache } from 'lru-cache' // [!code --]
import { lru } from 'tiny-lru' // [!code ++]

const cache = new LRUCache({ max: 500, ttl: 60_000 }) // [!code --]
const cache = lru(500, 60_000) // [!code ++]

cache.set('user:1', { name: 'Jane' })
cache.get('user:1')
```

## `quick-lru`

[`quick-lru`](https://github.com/sindresorhus/quick-lru) supports a TTL (`maxAge`), per-entry TTLs and an `onEviction` callback. It is ESM only.

It evicts entries in batches rather than one at a time, so it can hold up to twice `maxSize` entries, and doesn't always drop the least recently used one first.

<!-- prettier-ignore -->
```ts
import { LRUCache } from 'lru-cache' // [!code --]
import QuickLRU from 'quick-lru' // [!code ++]

const cache = new LRUCache({ max: 500, ttl: 60_000 }) // [!code --]
const cache = new QuickLRU({ maxSize: 500, maxAge: 60_000 }) // [!code ++]

cache.set('session', token, { ttl: 1000 }) // [!code --]
cache.set('session', token, { maxAge: 1000 }) // [!code ++]
```

## `Map` (native)

For a small cache without TTLs, a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is often enough, since it keeps keys in insertion order. Move an entry to the end when it is used, and delete the first key when the cache is full.

```ts
const max = 500
const cache = new Map()

function get(key) {
  if (!cache.has(key)) return undefined
  const value = cache.get(key)
  cache.delete(key)
  cache.set(key, value)
  return value
}

function set(key, value) {
  cache.delete(key)
  cache.set(key, value)
  if (cache.size > max) cache.delete(cache.keys().next().value)
}
```
