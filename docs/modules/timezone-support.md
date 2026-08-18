---
description: Native alternatives to the timezone-support package for listing, resolving and converting time zones
---

# Replacements for `timezone-support`

`timezone-support` ships its own copy of the IANA time zone database and helpers to convert between zones. Modern runtimes already ship this data: `Intl.supportedValuesOf` lists the available zones, and [`Temporal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) covers the conversion helpers.

## `Intl.supportedValuesOf`

[`Intl.supportedValuesOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf) replaces `listTimeZones`:

```ts
import { listTimeZones } from 'timezone-support' // [!code --]

const timeZones = listTimeZones() // [!code --]
const timeZones = Intl.supportedValuesOf('timeZone') // [!code ++]
```

## `Temporal`

`findTimeZone` is no longer needed — pass the IANA identifier directly.

Getting the wall-clock time in a zone (`getZonedTime`, `convertDateToTime`):

```ts
import { findTimeZone, getZonedTime } from 'timezone-support' // [!code --]

const date = new Date()
const berlin = findTimeZone('Europe/Berlin') // [!code --]
const time = getZonedTime(date, berlin) // [!code --]
const time = date.toTemporalInstant().toZonedDateTimeISO('Europe/Berlin') // [!code ++]
```

Getting the UTC offset (`getUTCOffset`):

```ts
import { findTimeZone, getUTCOffset } from 'timezone-support' // [!code --]

const berlin = findTimeZone('Europe/Berlin') // [!code --]
const { offset } = getUTCOffset(new Date(), berlin) // [!code --]
const { offset } = Temporal.Now.zonedDateTimeISO('Europe/Berlin') // [!code ++]
```

Note that `Temporal` returns the offset as a string (`'+02:00'`) or via `offsetNanoseconds`, rather than minutes.

Getting a timestamp or `Date` from a zoned time (`getUnixTime`, `convertTimeToDate`):

<!-- prettier-ignore -->
```ts
import { findTimeZone, getUnixTime } from 'timezone-support' // [!code --]

const berlin = findTimeZone('Europe/Berlin') // [!code --]
const time = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 } // [!code --]
const epoch = getUnixTime(time, berlin) // [!code --]
const epoch = Temporal.ZonedDateTime.from({ // [!code ++]
  timeZone: 'Europe/Berlin', // [!code ++]
  year: 2018, month: 9, day: 2, hour: 10, minute: 0 // [!code ++]
}).epochMilliseconds // [!code ++]

const date = new Date(epoch)
```

Attaching a zone to a wall-clock time (`setTimeZone`):

<!-- prettier-ignore -->
```ts
import { findTimeZone, setTimeZone } from 'timezone-support' // [!code --]

const berlin = findTimeZone('Europe/Berlin') // [!code --]
const time = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 } // [!code --]
const berlinTime = setTimeZone(time, berlin) // [!code --]
const berlinTime = Temporal.PlainDateTime // [!code ++]
  .from({ year: 2018, month: 9, day: 2, hour: 10, minute: 0 }) // [!code ++]
  .toZonedDateTime('Europe/Berlin') // [!code ++]
```

Parsing and formatting (`parseZonedTime`, `formatZonedTime`) — `Temporal` parses ISO 8601 strings and `toLocaleString` (backed by `Intl.DateTimeFormat`) handles output; custom format strings such as `'D.M.YYYY H:mm zZ'` are not supported:

<!-- prettier-ignore -->
```ts
import { parseZonedTime, formatZonedTime } from 'timezone-support/parse-format' // [!code --]

const time = parseZonedTime('2.9.2018 10:00 CEST+02:00', 'D.M.YYYY H:mm zZ') // [!code --]
const time = Temporal.ZonedDateTime.from('2018-09-02T10:00:00+02:00[Europe/Berlin]') // [!code ++]

const output = formatZonedTime(time, 'D.M.YYYY H:mm zZ') // [!code --]
const output = time.toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) // [!code ++]
```
