---
description: Modern alternatives to moment.js for date manipulation and formatting
---

# Replacements for `Moment.js`

## `day.js`

[Day.js](https://github.com/iamkun/dayjs/) provides a similar API to Moment.js with a much smaller footprint.

Example:

```diff
- import moment from 'moment'
+ import dayjs from 'dayjs'

- const now = moment()
+ const now = dayjs()

- const formatted = moment().format('YYYY-MM-DD')
+ const formatted = dayjs().format('YYYY-MM-DD')
```

## `date-fns`

[date-fns](https://github.com/date-fns/date-fns) offers tree-shakable functions for working with native JavaScript dates.

Example:

```diff
- import moment from 'moment'
+ import { addDays, format, subWeeks } from 'date-fns'

- const formatted = moment().format('YYYY-MM-DD')
+ const formatted = format(new Date(), 'yyyy-MM-dd')

- const tomorrow = moment().add(1, 'day')
+ const tomorrow = addDays(new Date(), 1)

- const lastWeek = moment().subtract(1, 'week')
+ const lastWeek = subWeeks(new Date(), 1)
```

## `luxon`

[Luxon](https://github.com/moment/luxon) is created by a Moment.js maintainer and offers powerful internationalization support.

Example:

```diff
- import moment from 'moment'
+ import { DateTime } from 'luxon'

- const now = moment()
+ const now = DateTime.now()

- const formatted = moment().format('YYYY-MM-DD')
+ const formatted = DateTime.now().toFormat('yyyy-MM-dd')

- const tomorrow = moment().add(1, 'day')
+ const tomorrow = DateTime.now().plus({ days: 1 })
```

## `Date` (native)

For simple use cases, native JavaScript [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) APIs may be sufficient:

<!-- prettier-ignore -->
```diff
- import moment from 'moment'
  
- const formatted = moment().format('YYYY-MM-DD')
+ const formatted = new Date().toISOString().split('T')[0]
  
- const localized = moment().format('MMMM Do YYYY')
+ const localized = new Intl.DateTimeFormat('en-US', {
+   year: 'numeric',
+   month: 'long',
+   day: 'numeric'
+ }).format(new Date())
```
