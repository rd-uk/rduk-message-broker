# RDUK - message broker

[![Codeship Status for rd-uk/rduk-message-broker](https://app.codeship.com/projects/11f4e850-ad51-0135-b44d-2a680d161fa2/status?branch=master)](https://app.codeship.com/projects/257198)

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