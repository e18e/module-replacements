---
description: Modern alternatives to the devicons-react package for Devicon React components
---

# Replacements for `devicons-react`

**Motivation:** `devicons-react` is archived, and its author now maintains it as `@devicons-pack/react`.

## `@devicons-pack/react`

[`devicons-react`](https://github.com/MKAbuMattar/archived-devicons-react) is archived and no longer maintained. [`@devicons-pack/react`](https://github.com/MKAbuMattar/devicons-pack) is its official successor from the same author, and stays in sync with the upstream [Devicon](https://github.com/devicons/devicon) collection. It ships both ESM and CommonJS builds.

Icons are grouped by variant (`original`, `plain`, `line`), and the variant is no longer part of the component name. You can import from the variant barrel, which tree-shakes, or from a per-icon path such as `@devicons-pack/react/plain/typescript`.

The `size` prop is gone, so use the standard `width` and `height` SVG props instead. Icons no longer default to `1rem`, so set a size if you relied on that.

`color` only affects icons drawn with `currentColor`, which covers most `plain` and `line` icons. These now inherit the text color instead of defaulting to the brand color. `original` icons keep their brand colors, so `color` has no effect on them.

Icons are decorative (`aria-hidden`) by default. Pass a `title` to give one an accessible label.

Example:

<!-- prettier-ignore -->
```tsx
import TypescriptPlain from 'devicons-react/icons/TypescriptPlain' // [!code --]
import { Typescript } from '@devicons-pack/react/plain' // [!code ++]

<TypescriptPlain size="50" color="#007acc" /> // [!code --]
<Typescript width="50" height="50" color="#007acc" /> // [!code ++]
```
