---
description: Modern alternatives to feather packages
---

# Replacements for `feather-icons` and `react-feather`

## `lucide` for `feather-icons`

[`lucide`](https://lucide.dev/) is a community-maintained fork of Feather Icons.

Example:

<!-- prettier-ignore -->
```js
import feather from 'feather-icons' // [!code --]
import { icons } from 'lucide' // [!code ++]

feather.icons.x.toSvg({ class: 'icon icon-x' }) // [!code --]
icons.x.toSvg({ class: 'icon icon-x' }) // [!code ++]
```

## `lucide-react` for `react-feather`

[`lucide-react`](https://lucide.dev/guide/packages/lucide-react) provides React components for the Lucide icon set and is the natural replacement for `react-feather`.

Example:

<!-- prettier-ignore -->
```jsx
import { Camera, ArrowRight } from 'react-feather' // [!code --]
import { Camera, ArrowRight } from 'lucide-react' // [!code ++]

export function Header() {
  return (
    <>
      <Camera size={18} />
      <ArrowRight className="cta-icon" />
    </>
  )
}
```

> [!NOTE]
> Lucide provides information on the [comparison](https://lucide.dev/guide/comparison#lucide-vs-feather-icons) of it vs feather-icons
