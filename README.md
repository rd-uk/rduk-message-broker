# RDUK - message broker

[![Codeship Status for rd-uk/rduk-message-broker](https://app.codeship.com/projects/11f4e850-ad51-0135-b44d-2a680d161fa2/status?branch=master)](https://app.codeship.com/projects/257198)
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