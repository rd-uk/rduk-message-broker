/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* istanbul ignore next */

'use strict'

const logger = require('@rduk/logger')
const extend = require('extend')
const BaseBrokerProvider = require('../base')

class AMQPProvider extends BaseBrokerProvider {
  get poolFactory () {
    /* istanbul ignore if */
    if (!this.config.poolFactory) {
      this.config.poolFactory = require('./pool')
    }

    return this.config.poolFactory
  }
  get pool () {
    if (!this._pool) {
      const address = this.config.address
      this._pool = this.poolFactory.create(address, this.config)
    }

    return this._pool
  }
  createChannel () {
    // get available connection from pool
    return this.pool.acquire()
      .then(connection => {
        let channel = connection.createChannel()
        this.pool.release(connection) // release connection for next message
        this.emit('CHANNEL_CREATED', channel)
        return channel
      })
  }
  publish (exchangeInfo, routingKey, messages, defaultOptions) {
    /* istanbul ignore else */
    if (!Array.isArray(messages)) {
      messages = [{
        content: messages,
        options: {}
      }]
    }

    return this.createChannel()
      .then(channel => {
        // check channel information
        return channel.assertExchange(exchangeInfo.name, exchangeInfo.type, exchangeInfo.options)
          .then(function () {
            let promises = messages.map(message => {
              // serialize content as JSON
              let content = JSON.stringify(message.content)
              // publish
              return channel.publish(
                exchangeInfo.name,
                routingKey,
                Buffer.from(content),
                extend(
                  {},
                  defaultOptions || {},
                  /* istanbul ignore next */
                  message.options || {}))
            })

            return Promise.all(promises)
          })
      })
  }
  consume (consumerInfo, ...args) {
    return this.createChannel()
      .then(channel => {
        return channel.assertQueue(consumerInfo.queue.name)
          .then(() => {
            let Translator = consumerInfo.translator
            let Processor = consumerInfo.processor
            let processor = new Processor(new Translator(), ...args)

            logger.info(`Listen on queue ${consumerInfo.queue.name}, waiting for messages...`)
            return channel.consume(consumerInfo.queue.name, msg => {
              /* istanbul ignore else */
              if (msg !== null) {
                processor.run(msg, channel, consumerInfo.queue.name)
                  .then(() => {
                    this.emit('MESSAGE_SUCCESS', msg)
                    channel.ack(msg)
                  })
                  .catch(() => {
                    this.emit('MESSAGE_FAILURE', msg)
                    channel.nack(msg, false, false)
                  })
              }
            })
          })
      })
  }
}

module.exports = AMQPProvider
