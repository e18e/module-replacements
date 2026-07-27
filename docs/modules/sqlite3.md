---
description: Modern alternatives to the sqlite3 package for working with SQLite in Node.js
---

# Replacements for `sqlite3`

## `node:sqlite` (native, since Node.js 22.13.0)

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

## `@libsql/client`

[`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts) is a modern, promise-based client that is fully compatible with SQLite. It supports local SQLite files, remote LibSQL servers, and Turso databases, making it easy to transition to the edge in the future.

Example:

```ts
import sqlite3 from 'sqlite3' // [!code --]
import { createClient } from '@libsql/client' // [!code ++]

const db = new sqlite3.Database('app.db') // [!code --]
const db = createClient({ url: 'file:app.db' }) // [!code ++]

db.all('SELECT * FROM users', (err, rows) => {}) // [!code --]
const { rows } = await db.execute('SELECT * FROM users') // [!code ++]
```
