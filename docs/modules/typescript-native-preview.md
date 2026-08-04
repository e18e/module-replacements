---
description: Modern alternative to the @typescript/native-preview package for the native version of TypeScript
---

# Replacements for `@typescript/native-preview`

## `typescript`

TypeScript v7 is no longer a preview and is now published under the `typescript` name, so `@typescript/native-preview` is no longer needed

```json
{
  "dependencies": {
    "@typescript/native-preview": "7.0.0-dev.20260707.2", // [!code --]
    "typescript": "7.0.2" // [!code ++]
  }
}
```
