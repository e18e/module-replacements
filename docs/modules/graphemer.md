---
description: Modern alternatives to the grapheme-splitter and graphemer packages for splitting strings into Unicode grapheme clusters
---

# Replacements for `grapheme-splitter` / `graphemer`

## `Intl.Segmenter` (native)

[`Intl.Segmenter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) is the modern native JavaScript API for text segmentation, available in Node.js 16+, Chrome 87+, Safari 14.1+, and Firefox 132+.

```diff
- import GraphemeSplitter from 'grapheme-splitter'

- const splitter = new GraphemeSplitter()
+ const segmenter = new Intl.Segmenter()

- const graphemes = splitter.splitGraphemes(text)
+ const graphemes = [...segmenter.segment(text)].map((s) => s.segment)

- const count = splitter.countGraphemes(text)
+ const count = [...segmenter.segment(text)].length
```

## `unicode-segmenter`

[`unicode-segmenter`](https://github.com/cometkim/unicode-segmenter) is a lightweight, fast alternative with zero dependencies and excellent browser compatibility.

```diff
- import GraphemeSplitter from 'grapheme-splitter'
+ import { countGraphemes, splitGraphemes } from 'unicode-segmenter/grapheme'

- const splitter = new GraphemeSplitter()

- const graphemes = splitter.splitGraphemes(text)
+ const graphemes = [...splitGraphemes(text)]

- const count = splitter.countGraphemes(text)
+ const count = countGraphemes(text)
```

You can also use it as an `Intl.Segmenter` polyfill:

```ts
import 'unicode-segmenter/intl-polyfill'

const segmenter = new Intl.Segmenter()
const graphemes = [...segmenter.segment(text)].map((s) => s.segment)
```
