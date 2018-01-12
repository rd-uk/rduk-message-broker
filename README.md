# RDUK - message broker

[![Build Status](https://travis-ci.org/rd-uk/rduk-message-broker.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-message-broker)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-message-broker/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-message-broker?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/rd-uk/rduk-message-broker/badges/score.svg)](https://www.bithound.io/github/rd-uk/rduk-message-broker)


Easily publish and consume messages to and from broker

# Migration

## from v1 to v2
- [`amqplib`](https://www.npmjs.com/package/amqplib) is now a peer dependency.
So, if you want to use the built-in `AMQPProvider`, make sure to add this module
to your project.

## Broker

## Translator

## Processor

## Configuration

```yaml
---
broker:
  default: amqp
  providers:
    -
      name: amqp
      type: '@rduk/message-broker/lib/provider/amqp'
      address: amqp://user:password@url
  queues:
    sms:
      name: sms.fr
      headers:
        prefix: '+33'
  consumers:
    sms:
      queue: sms
      translator: '@rduk/message-broker/lib/translator/default'
      processor: '@rduk/message-broker/lib/processor/default'
```

## License and Copyright

SEE [LICENSE](./LICENSE).
