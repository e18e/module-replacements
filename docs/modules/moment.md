---
description: Modern alternatives to moment.js for date manipulation and formatting
---

# Replacements for `Moment.js`

## `day.js`

[Day.js](https://github.com/iamkun/dayjs/) provides a similar API to Moment.js with a much smaller footprint.

Example:

```ts
import moment from 'moment' // [!code --]
import dayjs from 'dayjs' // [!code ++]

const now = moment() // [!code --]
const now = dayjs() // [!code ++]

const formatted = moment().format('YYYY-MM-DD') // [!code --]
const formatted = dayjs().format('YYYY-MM-DD') // [!code ++]
```

## `date-fns`

[date-fns](https://github.com/date-fns/date-fns) offers tree-shakable functions for working with native JavaScript dates.

Example:

```ts
import moment from 'moment' // [!code --]
import { addDays, format, subWeeks } from 'date-fns' // [!code ++]

const formatted = moment().format('YYYY-MM-DD') // [!code --]
const formatted = format(new Date(), 'yyyy-MM-dd') // [!code ++]

const tomorrow = moment().add(1, 'day') // [!code --]
const tomorrow = addDays(new Date(), 1) // [!code ++]

const lastWeek = moment().subtract(1, 'week') // [!code --]
const lastWeek = subWeeks(new Date(), 1) // [!code ++]
```

## `luxon`

[Luxon](https://github.com/moment/luxon) is created by a Moment.js maintainer and offers powerful internationalization support.

Example:

```ts
import moment from 'moment' // [!code --]
import { DateTime } from 'luxon' // [!code ++]

const now = moment() // [!code --]
const now = DateTime.now() // [!code ++]

const formatted = moment().format('YYYY-MM-DD') // [!code --]
const formatted = DateTime.now().toFormat('yyyy-MM-dd') // [!code ++]

const tomorrow = moment().add(1, 'day') // [!code --]
const tomorrow = DateTime.now().plus({ days: 1 }) // [!code ++]
```

## `Date` (native)

For simple use cases, native JavaScript [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) APIs may be sufficient:

<!-- prettier-ignore -->
```ts
import moment from 'moment' // [!code --]

const formatted = moment().format('YYYY-MM-DD') // [!code --]
const formatted = new Date().toISOString().split('T')[0] // [!code ++]

const localized = moment().format('MMMM Do YYYY') // [!code --]
const localized = new Intl.DateTimeFormat('en-US', { // [!code ++]
  year: 'numeric', // [!code ++]
  month: 'long', // [!code ++]
  day: 'numeric' // [!code ++]
}).format(new Date()) // [!code ++]
```

## `Temporal` (native)

The [`Temporal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) API is a modern, native JavaScript specification that replaces the legacy `Date` object and removes the need for external libraries like Moment.js by providing immutable date-time objects and built-in timezone handling.

Example:

```ts
import moment from 'moment' // [!code --]

const now = moment() // [!code --]
const now = Temporal.Now.instant() // [!code ++]

const formatted = moment().format('YYYY-MM-DD') // [!code --]
const formatted = Temporal.Now.plainDateISO().toString() // [!code ++]

const tomorrow = moment().add(1, 'day') // [!code --]
const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 }) // [!code ++]
```
