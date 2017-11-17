# RDUK - message broker

[![CircleCI](https://circleci.com/gh/rd-uk/rduk-message-broker.svg?style=svg&circle-token=89ba1deae0988464078ef5107ab02803e7a78f4b)](https://circleci.com/gh/rd-uk/rduk-message-broker)
[![Maintainability](https://api.codeclimate.com/v1/badges/3d55512fbebfcd4bb1bf/maintainability)](https://codeclimate.com/repos/5a0eb2ce2be9ce02db0015e2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3d55512fbebfcd4bb1bf/test_coverage)](https://codeclimate.com/repos/5a0eb2ce2be9ce02db0015e2/test_coverage)

Easily publish and consume messages to and from broker

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