---
description: Modern alternatives to the react-helmet package
---

# Replacements for `react-helmet`

## Support for Document Metadata (native, since React 19)

[Support for Document Metadata](https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags) is available since React 19

Example:

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="keywords" content={post.keywords} />
      <p>Eee equals em-see-squared...</p>
    </article>
  )
}
```

## `react-helmet-async`

[`react-helmet-async`](https://github.com/staylor/react-helmet-async) is a fork of `react-helmet`.

Example:

<!-- prettier-ignore -->
```diff
- import { Helmet } from 'react-helmet'
+ import { Helmet, HelmetProvider } from 'react-helmet-async'
  
  const app = (
+   <HelmetProvider>
      <App>
        <Helmet>
          <title>Hello World</title>
          <link rel="canonical" href="https://e18e.dev/" />
        </Helmet>
        <h1>Hello World</h1>
      </App>
+   </HelmetProvider>
  )
```
