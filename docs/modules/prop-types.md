---
description: Modern alternatives to the prop-types package for checking React props
---

# Replacements for `prop-types`

`prop-types` is [no longer maintained](https://github.com/meta/prop-types), and React 19 [no longer runs `propTypes` checks](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops).

## TypeScript

[TypeScript](https://www.typescriptlang.org/) checks component props before your code runs.

Follow React's [TypeScript setup guide](https://react.dev/learn/typescript), then replace `propTypes` with TypeScript types:


Before:

```javascript
import PropTypes from 'prop-types'

function Greeting({ name }) {
  return <p>Hello, {name}!</p>
}

Greeting.propTypes = {
  name: PropTypes.string
}
```

After:

```typescript
interface GreetingProps {
  name?: string
}

function Greeting({ name }: GreetingProps) {
  return <p>Hello, {name}!</p>
}
```

React also provides a [codemod](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops) to help with the conversion:

```sh
npx codemod@latest react/prop-types-typescript
```

After migrating, run your type checker and remove `prop-types` from your dependencies.

TypeScript does not check values at runtime. If you specificaly need runtime validation, you can use a library like [zod](https://zod.dev).
