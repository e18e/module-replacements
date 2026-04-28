---
description: Modern alternatives to the sqlite3 package for working with SQLite in Node.js
---

# Replacements for `sqlite3`

## `node:sqlite` (native, Node.js)

Node.js ships a built-in SQLite module, [`node:sqlite`](https://nodejs.org/api/sqlite.html), which is the preferred option when you can target a recent Node runtime.

Example:

```ts
import sqlite3 from 'sqlite3' // [!code --]
import { DatabaseSync } from 'node:sqlite' // [!code ++]

const db = new sqlite3.Database('app.db') // [!code --]
const db = new DatabaseSync('app.db') // [!code ++]

db.all('SELECT * FROM users', (err, rows) => {}) // [!code --]
const rows = db.prepare('SELECT * FROM users').all() // [!code ++]
```

## `better-sqlite3`

[`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) is a popular and actively maintained SQLite library for Node.js.

Example:

```ts
import sqlite3 from 'sqlite3' // [!code --]
import Database from 'better-sqlite3' // [!code ++]

const db = new sqlite3.Database('app.db') // [!code --]
const db = new Database('app.db') // [!code ++]

db.all('SELECT * FROM users', (err, rows) => {}) // [!code --]
const rows = db.prepare('SELECT * FROM users').all() // [!code ++]
```

## `sqlite`

[`sqlite`](https://github.com/kriasoft/node-sqlite) is an actively maintained option commonly used for promise-based APIs.

Example:

```ts
import sqlite3 from 'sqlite3' // [!code --]
import { open } from 'sqlite' // [!code ++]

const db = new sqlite3.Database('app.db') // [!code --]
const db = await open({ filename: 'app.db', driver: sqlite3.Database }) // [!code ++]

db.all('SELECT * FROM users', (err, rows) => {}) // [!code --]
const rows = await db.all('SELECT * FROM users') // [!code ++]
```
