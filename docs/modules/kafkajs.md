---
description: Modern alternatives to the kafkajs package for producing and consuming Apache Kafka messages
---

# Replacements for `kafkajs`

**Motivation:** `kafkajs` is [no longer maintained](https://github.com/tulios/kafkajs/issues/1603) and hasn't been published since February 2023.

## `@confluentinc/kafka-javascript`

[`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript) is Confluent's official client, built on top of `librdkafka`. It ships a KafkaJS-compatible API, so most code only needs a new import and a `kafkaJS` block around its config. Options like `fromBeginning`, `acks` and `autoCommit` move from the method calls to the client config.

See the [migration guide](https://github.com/confluentinc/confluent-kafka-javascript/blob/master/MIGRATION.md#kafkajs) for the full list of differences.

Example:

<!-- prettier-ignore -->
```ts
import { Kafka } from 'kafkajs' // [!code --]
import { KafkaJS } from '@confluentinc/kafka-javascript' // [!code ++]

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] }) // [!code --]
const kafka = new KafkaJS.Kafka({ kafkaJS: { clientId: 'my-app', brokers: ['localhost:9092'] } }) // [!code ++]

const producer = kafka.producer()
await producer.connect()
await producer.send({
  topic: 'events',
  messages: [{ key: 'user-123', value: 'hello' }]
})

const consumer = kafka.consumer({ groupId: 'my-group' }) // [!code --]
const consumer = kafka.consumer({ kafkaJS: { groupId: 'my-group', fromBeginning: true } }) // [!code ++]
await consumer.connect()
await consumer.subscribe({ topic: 'events', fromBeginning: true }) // [!code --]
await consumer.subscribe({ topic: 'events' }) // [!code ++]
await consumer.run({
  eachMessage: async ({ message }) => {
    console.log(message.key?.toString(), message.value?.toString())
  }
})
```

## `@platformatic/kafka`

[`@platformatic/kafka`](https://github.com/platformatic/kafka) is a pure JavaScript client with built-in TypeScript types and no native addon. Its API is different from `kafkajs`: brokers are passed to each client directly, serializers handle encoding, and consumers return a Node.js stream.

Example:

<!-- prettier-ignore -->
```ts
import { Kafka } from 'kafkajs' // [!code --]
import { Consumer, Producer, stringDeserializers, stringSerializers } from '@platformatic/kafka' // [!code ++]

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] }) // [!code --]

const producer = kafka.producer() // [!code --]
await producer.connect() // [!code --]
await producer.send({ // [!code --]
  topic: 'events', // [!code --]
  messages: [{ key: 'user-123', value: 'hello' }] // [!code --]
}) // [!code --]
const producer = new Producer({ // [!code ++]
  clientId: 'my-app', // [!code ++]
  bootstrapBrokers: ['localhost:9092'], // [!code ++]
  serializers: stringSerializers // [!code ++]
}) // [!code ++]
await producer.send({ // [!code ++]
  messages: [{ topic: 'events', key: 'user-123', value: 'hello' }] // [!code ++]
}) // [!code ++]

const consumer = kafka.consumer({ groupId: 'my-group' }) // [!code --]
await consumer.connect() // [!code --]
await consumer.subscribe({ topic: 'events', fromBeginning: true }) // [!code --]
await consumer.run({ // [!code --]
  eachMessage: async ({ message }) => { // [!code --]
    console.log(message.key?.toString(), message.value?.toString()) // [!code --]
  } // [!code --]
}) // [!code --]
const consumer = new Consumer({ // [!code ++]
  groupId: 'my-group', // [!code ++]
  clientId: 'my-app', // [!code ++]
  bootstrapBrokers: ['localhost:9092'], // [!code ++]
  deserializers: stringDeserializers // [!code ++]
}) // [!code ++]
const stream = await consumer.consume({ // [!code ++]
  topics: ['events'], // [!code ++]
  mode: 'committed', // [!code ++]
  fallbackMode: 'earliest' // [!code ++]
}) // [!code ++]
for await (const message of stream) { // [!code ++]
  console.log(message.key, message.value) // [!code ++]
} // [!code ++]
```
