---
description: Modern replacements for the wellknown package, a WKT parser and stringifier
---

# Replacements for `wellknown`

## `betterknown`

[`betterknown`](https://github.com/placemark/betterknown) is a maintained alternative for `wellknown` package.

Example:

```js
import wellknown from 'wellknown' // [!code --]
import { wktToGeoJSON, geoJSONToWkt } from 'betterknown' // [!code ++]

wellknown.parse('POINT(1 2)') // [!code --]
wktToGeoJSON('POINT(1 2)') // [!code ++]

wellknown.stringify({ // [!code --]
geoJSONToWkt({ // [!code ++]
  type: 'Point',
  coordinates: [1, 2]
})

wellknown.stringify({ // [!code --]
geoJSONToWkt({ // [!code ++]
  type: 'Feature',
  geometry: { type: 'Point', coordinates: [1, 2] },
  properties: {}
})
```
