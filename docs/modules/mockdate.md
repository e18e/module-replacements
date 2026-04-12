---
description: Modern alternatives to the mockdate package for mocking time in tests
---

# Replacements for `mockdate`

`mockdate` is mainly used in tests, and modern test runners already include built-in APIs for mocking time without pulling in an extra dependency.

## `vitest`

[`vitest`](https://vitest.dev/guide/mocking.html#mock-the-current-date) provides `vi.useFakeTimers()` and `vi.setSystemTime()` for mocking the current date during tests.

```ts
import MockDate from 'mockdate' // [!code --]
import { vi, test, expect } from 'vitest' // [!code ++]

test('freeze date', () => {
  MockDate.set('2026-01-01') // [!code --]
  vi.useFakeTimers() // [!code ++]
  vi.setSystemTime(new Date('2026-01-01')) // [!code ++]

  expect(new Date().toISOString()).toBe('2026-01-01T00:00:00.000Z')

  MockDate.reset() // [!code --]
  vi.useRealTimers() // [!code ++]
})
```

## `node:test`

[`node:test`](https://nodejs.org/en/learn/test-runner/mocking#time) supports mocking time via `mock.timers` since node 20.4.0 and later.

```ts
import MockDate from 'mockdate' // [!code --]
import { test } from 'node:test' // [!code ++]
import assert from 'node:assert/strict' // [!code ++]

test('freeze date', (t) => {
  MockDate.set('2026-01-01') // [!code --]
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-01-01') }) // [!code ++]

  assert.equal(new Date().toISOString(), '2026-01-01T00:00:00.000Z')

  MockDate.reset() // [!code --]
})
```

## `bun:test`

[`bun:test`](https://bun.com/docs/guides/test/mock-clock) provides `mock.timers.enable()` for mocking time in tests.

```ts
import MockDate from 'mockdate' // [!code --]
import { test, expect, mock } from 'bun:test' // [!code ++]

test('freeze date', () => {
  MockDate.set('2026-01-01') // [!code --]
  mock.timers.enable({ now: new Date('2026-01-01') }) // [!code ++]

  expect(new Date().toISOString()).toBe('2026-01-01T00:00:00.000Z')

  MockDate.reset() // [!code --]
  mock.timers.reset() // [!code ++]
})
```
