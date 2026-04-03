---
description: Modern replacements for the tokml package for converting GeoJSON to KML
---

# Replacements for `tokml`

## `@placemarkio/tokml`

[`@placemarkio/tokml`](https://github.com/placemark/tokml) is a maintained alternative for `tokml` package.

Example:

```js
import tokml from 'tokml' // [!code --]
import { toKML } from '@placemarkio/tokml' // [!code ++]

const geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [1, 2] },
    properties: { name: 'Marker' }
  }]
}

const kml = tokml(geojson) // [!code --]
const kml = toKML(geojson) // [!code ++]
```
