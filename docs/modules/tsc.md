---
description: Modern alternatives to the tsc package for the TypeScript compiler
---

# Replacements for `tsc`

The npm package [`tsc`](https://github.com/basarat/tsc) is **not** the TypeScript compiler — it is a deprecated stub that prints _"This is not the tsc command you are looking for"_ when run.

## `typescript`

The [`typescript`](https://github.com/microsoft/TypeScript) package is the official compiler and provides the real `tsc` binary via `node_modules/.bin`. Replace `tsc` in your dependencies:

```json
{
  "devDependencies": {
    "tsc": "^2.0.4", // [!code --]
    "typescript": "^5.9.0" // [!code ++]
  }
}
```

Existing `"build": "tsc"` scripts work unchanged once `typescript` is installed. For `npx` or global installs, use `typescript` — not `tsc`:

```bash
npx tsc --init # [!code --]
npx --package typescript tsc --init # [!code ++]

npm install -g tsc # [!code --]
npm install -g typescript # [!code ++]
```
