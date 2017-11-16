# Rduk - message broker


## Configuration

```yaml
---
broker:
  default: amqp
  providers:
    -
      name: amqp
      type: rduk-message-broker/lib/provider/amqp
      address: amqp://user:password@url
  queues:
    sms:
      name: sms.fr
      headers: 
        prefix: '+33'
  consumers:
    sms:
      queue: sms
      translator: ~/path/to/translator
      processor: ~/path/to/processor
```

## License and Copyright

This module is released under the terms of the [MIT license](./LICENSE).