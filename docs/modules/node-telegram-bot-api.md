---
description: Modern alternatives to the node-telegram-bot-api package
---

# Replacements for `node-telegram-bot-api`

## `grammy`

[`grammy`](https://grammy.dev) is a modern library for creating telegram bots.

Example:

```ts
import process from 'node:process'
import { Bot } from 'grammy'

const bot = new Bot(process.env.TOKEN)

bot.on('message', (ctx) => ctx.reply('Hi there!'))

bot.start()
```
