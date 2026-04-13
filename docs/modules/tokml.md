---
description: Modern replacements for the tokml package for converting GeoJSON to KML
---

# Replacements for `tokml`

## `@placemarkio/tokml`

[`@placemarkio/tokml`](https://github.com/placemark/tokml) is a maintained alternative for `tokml` package.

Example:

```diff
- import tokml from 'tokml'
+ import { toKML } from '@placemarkio/tokml'

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [1, 2] },
        properties: { name: 'Marker' }
      }
    ]
  }

- const kml = tokml(geojson)
+ const kml = toKML(geojson)
```
