---
description: Modern alternatives to the kafkajs package
---

# Replacements for `kafkajs`

`kafkajs` is [no longer maintained](https://github.com/tulios/kafkajs/issues/1603). Both replacements below are actively maintained [Kafka](https://kafka.apache.org/) clients; choose based on your runtime and migration requirements.

## `@platformatic/kafka`

[`@platformatic/kafka`](https://github.com/platformatic/kafka) is a modern, pure TypeScript/JavaScript Kafka client with no native addon. It uses separate producer, consumer, and admin clients, and provides type-safe APIs, serializers, and stream-based consumers.

Example:

<!-- prettier-ignore -->
```js
const { Kafka } = require('kafkajs') // [!code --]
const { Producer, stringSerializers } = require('@platformatic/kafka') // [!code ++]

const kafka = new Kafka({ // [!code --]
  clientId: 'my-app', // [!code --]
  brokers: ['localhost:9092'] // [!code --]
}) // [!code --]
const producer = kafka.producer() // [!code --]
const producer = new Producer({ // [!code ++]
  clientId: 'my-app', // [!code ++]
  bootstrapBrokers: ['localhost:9092'], // [!code ++]
  serializers: stringSerializers // [!code ++]
}) // [!code ++]

await producer.connect() // [!code --]
await producer.send({
  topic: 'events', // [!code --]
  messages: [{ key: 'event-1', value: 'created' }]
})

await producer.disconnect() // [!code --]
await producer.close() // [!code ++]
```

## `@confluentinc/kafka-javascript`

[`@confluentinc/kafka-javascript`](https://github.com/confluentinc/confluent-kafka-javascript) is Confluent's client, backed by the native `librdkafka` library. Confluent was founded by [Kafka's](https://kafka.apache.org/) creators and is a major contributor to the Kafka project. Its KafkaJS-compatible API can make it a good choice for incremental migrations, but it has native binaries.

Example:

<!-- prettier-ignore -->
```js
const { Kafka } = require('kafkajs') // [!code --]
const { Kafka } = require('@confluentinc/kafka-javascript').KafkaJS // [!code ++]

const kafka = new Kafka({
  clientId: 'my-app', // [!code --]
  brokers: ['localhost:9092'] // [!code --]
  kafkaJS: { // [!code ++]
    clientId: 'my-app', // [!code ++]
    brokers: ['localhost:9092'] // [!code ++]
  } // [!code ++]
})
```
