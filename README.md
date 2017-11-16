# Rduk - message broker

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

This module is released under the terms of the [MIT license](./LICENSE).