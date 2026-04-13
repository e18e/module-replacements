---
description: Modern alternatives to the mockdate package for mocking time in tests
---

# Replacements for `mockdate`

`mockdate` is mainly used in tests, and modern test runners already include built-in APIs for mocking time without pulling in an extra dependency.

## `vitest`

[`vitest`](https://vitest.dev/guide/mocking.html#mock-the-current-date) provides `vi.useFakeTimers()` and `vi.setSystemTime()` for mocking the current date during tests.

```diff
- import MockDate from 'mockdate'
+ import { vi, test, expect } from 'vitest'

  test('freeze date', () => {
-   MockDate.set('2026-01-01')
+   vi.useFakeTimers()
+   vi.setSystemTime(new Date('2026-01-01'))

    expect(new Date().toISOString()).toBe('2026-01-01T00:00:00.000Z')

-   MockDate.reset()
+   vi.useRealTimers()
  })
```

## `node:test`

[`node:test`](https://nodejs.org/en/learn/test-runner/mocking#time) supports mocking time via `mock.timers` since node 20.4.0 and later.

```diff
- import MockDate from 'mockdate'
+ import { test } from 'node:test'
+ import assert from 'node:assert/strict'

  test('freeze date', (t) => {
-   MockDate.set('2026-01-01')
+   t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-01-01') })

    assert.equal(new Date().toISOString(), '2026-01-01T00:00:00.000Z')

-   MockDate.reset()
  })
```

## `bun:test`

[`bun:test`](https://bun.com/docs/guides/test/mock-clock) provides `mock.timers.enable()` for mocking time in tests.

```diff
- import MockDate from 'mockdate'
+ import { test, expect, mock } from 'bun:test'

  test('freeze date', () => {
-   MockDate.set('2026-01-01')
+   mock.timers.enable({ now: new Date('2026-01-01') })

    expect(new Date().toISOString()).toBe('2026-01-01T00:00:00.000Z')

-   MockDate.reset()
+   mock.timers.reset()
  })
```
