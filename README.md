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

```js
const broker = require('@rduk/message-broker');

// publish messge to exchange
broker.publish('sms', '', {phone: '+33612345678', msg: 'does it work?'}, {
    headers: {
        prefix: '+33'
    }})
    .then(console.log)
    .catch(console.error)

// consume messages
broker.consume('sms');
```

## Translator
In charge of translating the message from the queue before it could be consume
by a processor.

### Existing Translator

- [DefaultTranslator](./lib/translator/default.js) : message returned as is.
- [JSONTranslator](./lib/translator/json.js) : message parsed as json.

## Processor
In charge of process the message received from the queue.

### Example
```js
const BaseProcessor = require('@rduk/message-broker/lib/processor/base');
const sms = require('@rduk/sms');
const logger = require('@rduk/logger');

class SmsProcessor extends BaseProcessor {
    constructor(translator) {
        super(translator);
    }
    run(msg) {
        return this.translator.translate(msg.content)
            .then(content => sms.getInstance().send(content.phone, content.msg))
            .catch(err => {
                logger.error(err.message);
                throw err;
            })
    }
}

```

## Configuration

```yaml
---
connections:
  -
    name: twilio
    accountSid: ${TWILIO_ACCOUNT_SID}
    authToken: ${TWILIO_AUTH_TOKEN}
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
    sms-it:
      name: sms.it
      headers:
        prefix: '+39'
  exchanges:
    sms:
      name: sms
      type: headers
      options:
          durable: true
          internal: false
          alternateExchange: sms.alt
  consumers:
    sms:
      queue: sms
      translator: '@rduk/message-broker/lib/translator/json'
      processor: '@rduk/message-broker/lib/processor/default'
sms:
  default: twilio
  providers:
    -
      name: twilio
      type: '@rduk/sms-twilio'
      connection: twilio
```

## License and Copyright

SEE [LICENSE](./LICENSE).
