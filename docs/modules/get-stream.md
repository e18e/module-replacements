---
description: Modern alternatives to the get-stream package
---

# Replacements for `get-stream`

## Converting stream to string

You can convert a stream to a string by using `Buffer.from` and a `for await`:

```ts
async function streamToString(stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf-8')
}
```

## Converting stream to Array

You can convert a stream to an array using [`Array.fromAsync`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync) in Node 22+:

```ts
await Array.fromAsync(stream)

// or before Node 22

async function streamToArray(stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return chunks
}
```

## Converting stream to Buffer

You can convert a stream to a `Buffer` using [`Array.fromAsync`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync) with a mapper:

```ts
async function streamToBuffer(stream) {
  const chunks = await Array.fromAsync(stream, (chunk) => Buffer.from(chunk))
  return Buffer.concat(chunks)
}

// or before Node 22

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }
  return Buffer.concat(chunks)
}
```
