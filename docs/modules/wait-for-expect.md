---
description: Replace wait-for-expect with built-in assertion retries in Vitest or node:test
---

# Replacements for `wait-for-expect`

If your tests already use Vitest or `node:test`, you can replace `wait-for-expect` with the runner's built-in assertion retries.

Both APIs retry callbacks that throw or return a rejected promise until they succeed or time out. Keep the assertion inside the callback and await the result; returning `false` alone does not trigger a retry.

The arguments change from `waitForExpect(callback, timeout, interval)` to `vi.waitFor(callback, { timeout, interval })` or `t.waitFor(callback, { timeout, interval })`. The examples below preserve `wait-for-expect`'s default settings of a 4,500 ms timeout and 50 ms interval. Both runners otherwise default to a 1,000 ms timeout and 50 ms interval. Matching these settings does not guarantee identical scheduling or timeout behavior.

## `vitest`

[`vi.waitFor()`](https://vitest.dev/api/vi.html#vi-waitfor) is available since Vitest 0.34.5 and accepts synchronous or asynchronous assertion callbacks.

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

[`t.waitFor()`](https://nodejs.org/api/test.html#contextwaitforcondition-options) is available on the test context since Node.js 22.14.0 and 23.7.0. It also accepts synchronous or asynchronous assertion callbacks.

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
