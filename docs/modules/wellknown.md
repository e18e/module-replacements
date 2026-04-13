---
description: Modern replacements for the wellknown package, a WKT parser and stringifier
---

# Replacements for `wellknown`

## `betterknown`

[`betterknown`](https://github.com/placemark/betterknown) is a maintained alternative for `wellknown` package.

Example:

```diff
- import wellknown from 'wellknown'
+ import { wktToGeoJSON, geoJSONToWkt } from 'betterknown'

- wellknown.parse('POINT(1 2)')
+ wktToGeoJSON('POINT(1 2)')

- wellknown.stringify({
+ geoJSONToWkt({
    type: 'Point',
    coordinates: [1, 2]
  })

- wellknown.stringify({
+ geoJSONToWkt({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 2] },
    properties: {}
  })
```
