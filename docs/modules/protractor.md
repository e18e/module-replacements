---
description: Modern alternatives to the protractor package for end-to-end testing
---

# Replacements for `protractor`

**Motivation:** `protractor` is deprecated and reached end-of-life in 2023. Its npm deprecation notice points to the Angular blog for other end-to-end testing options.

## `@playwright/test`

[`@playwright/test`](https://playwright.dev/) runs tests in Chromium, Firefox and WebKit, and waits for elements automatically, so you don't need `browser.waitForAngular()` or explicit waits. Playwright has a [migration guide from Protractor](https://playwright.dev/docs/protractor).

Protractor's `baseUrl` becomes `use.baseURL` in `playwright.config.ts`.

<!-- prettier-ignore -->
```ts
import { browser, by, element } from 'protractor' // [!code --]
import { expect, test } from '@playwright/test' // [!code ++]

it('shows a welcome message', async () => { // [!code --]
test('shows a welcome message', async ({ page }) => { // [!code ++]
  await browser.get('/login') // [!code --]
  await page.goto('/login') // [!code ++]
  await element(by.css('#name')).sendKeys('Jane') // [!code --]
  await page.locator('#name').fill('Jane') // [!code ++]
  await element(by.buttonText('Sign in')).click() // [!code --]
  await page.getByRole('button', { name: 'Sign in' }).click() // [!code ++]
  expect(await element(by.css('.welcome')).getText()).toEqual('Welcome, Jane') // [!code --]
  await expect(page.locator('.welcome')).toHaveText('Welcome, Jane') // [!code ++]
})
```

## `webdriverio`

[`webdriverio`](https://webdriver.io/) uses WebDriver like Protractor does, so it is the closer fit if you depend on WebDriver or a Selenium grid. WebdriverIO has a [migration guide from Protractor](https://webdriver.io/docs/protractor-migration), and [`@wdio/codemod`](https://github.com/webdriverio/codemod) rewrites most Protractor calls for you:

```sh
npm init wdio@latest .
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./e2e/
```

For TypeScript tests, add `--parser=tsx`.
