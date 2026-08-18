---
description: Modern alternatives to the vue3-markdown-it package for rendering markdown in Vue
---

# Replacements for `vue3-markdown-it`

## `vue-markdown-render`

[`vue3-markdown-it`](https://github.com/JanGuillermo/vue3-markdown-it) is archived and unmaintained, and has a known vulnerability through one of its direct dependencies ([GHSA-6v5v-wf23-fmfq](https://github.com/advisories/GHSA-6v5v-wf23-fmfq)).

[`vue-markdown-render`](https://github.com/cloudacy/vue-markdown-render) is an actively maintained, near drop-in replacement built on `markdown-it`. In most cases only the import needs to change:

```ts
import Markdown from 'vue3-markdown-it' // [!code --]
import Markdown from 'vue-markdown-render' // [!code ++]
```

Options and plugins are still passed to the component via props (`options`, `plugins`); check the [vue-markdown-render documentation](https://github.com/cloudacy/vue-markdown-render#readme) if you rely on less common `vue3-markdown-it` props.
