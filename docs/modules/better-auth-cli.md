---
description: Modern alternative to the @better-auth/cli package for the Better Auth CLI
---

# Replacements for `@better-auth/cli`

## `auth`

The Better Auth CLI is now published under the `auth` name, and `@better-auth/cli` is deprecated, so switch the dependency over.

```json
{
  "devDependencies": {
    "@better-auth/cli": "1.4.21", // [!code --]
    "auth": "1.7.3" // [!code ++]
  }
}
```

```bash
npx @better-auth/cli generate # [!code --]
npx auth generate # [!code ++]
```
