---
description: Replace wait-for-expect with built-in assertion retries in Vitest or node:test
---

# Replacements for `wait-for-expect`

**Motivation:** Popular test runners such as Vitest and `node:test` provide built-in assertion retries, so projects using them can remove `wait-for-expect`.

## `vitest`

[`vi.waitFor()`](https://vitest.dev/api/vi.html#vi-waitfor) is available since Vitest 0.34.5 and accepts synchronous or asynchronous assertion callbacks.

It retries callbacks that throw or reject until they succeed or time out. Keep the assertion inside the callback and await the result; returning `false` alone does not trigger a retry.

```ts
import waitForExpect from 'wait-for-expect' // [!code --]
import { expect, test } from 'vitest' // [!code --]
import { expect, test, vi } from 'vitest' // [!code ++]

test('service becomes ready', async () => {
  const checkReady = async () => {
    expect(await service.isReady()).toBe(true)
  }

  await waitForExpect(checkReady, 4500, 50) // [!code --]
  await vi.waitFor(checkReady, { timeout: 4500, interval: 50 }) // [!code ++]
})
```

If you use `vi.useFakeTimers()`, `vi.waitFor()` automatically advances fake timers by the polling interval on each check. Review tests that previously advanced timers manually.

## `node:test`

[`t.waitFor()`](https://nodejs.org/api/test.html#contextwaitforcondition-options) is available on the test context since Node.js 22.14.0 and 23.7.0 and accepts synchronous or asynchronous assertion callbacks.

It retries callbacks that throw or reject until they succeed or time out. Keep the assertion inside the callback and await the result; returning `false` alone does not trigger a retry.

```ts
import waitForExpect from 'wait-for-expect' // [!code --]
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('service becomes ready', async (t) => {
  const checkReady = async () => {
    assert.equal(await service.isReady(), true)
  }

  await waitForExpect(checkReady, 4500, 50) // [!code --]
  await t.waitFor(checkReady, { timeout: 4500, interval: 50 }) // [!code ++]
})
```
