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

'use strict'

const logger = require('@rduk/logger')
const extend = require('extend')
const BaseBrokerProvider = require('../base')
const poolFactory = require('./pool')

class AMQPProvider extends BaseBrokerProvider {
  get pool () {
    if (!this._pool) {
      let address = this.config.address
      console.log(address)
      this._pool = poolFactory.create(address, this.config)
    }

    return this._pool
  }
  publish (exchangeInfo, routingKey, messages, defaultOptions) {
    if (!Array.isArray(messages)) {
      messages = [{
        content: messages,
        options: {}
      }]
    }

    // get available connection from pool
    return this.pool.acquire()
            .then(connection => {
              let channel = connection.createChannel()
              this.pool.release(connection) // release connection for next message
              return channel
            })
            .then(channel => {
                // check channel information
              return channel.assertExchange(exchangeInfo.name, exchangeInfo.type, exchangeInfo.options)
                    .then(function () {
                      let promises = messages.map(message => {
                        // serialize content as JSON
                        let content = JSON.stringify(message.content)
                        // publish
                        console.log(
                          defaultOptions,
                          message.options,
                          extend({}, defaultOptions || {}, message.options || {}))
                        return channel.publish(
                          exchangeInfo.name,
                          routingKey,
                          Buffer.from(content),
                          extend({}, defaultOptions || {}, message.options || {}))
                      })

                      return Promise.all(promises)
                    })
            })
  }
  consume (consumerInfo) {
    return this.pool.acquire()
            .then(function (connection) {
              return connection.createChannel()
            })
            .then(function (channel) {
              return channel.assertQueue(consumerInfo.queue.name)
                    .then(function () {
                      let Translator = consumerInfo.translator
                      let Processor = consumerInfo.processor
                      let processor = new Processor(new Translator())

                      logger.info(`Listen on queue ${consumerInfo.queue.name}, waiting for messages...`)
                      return channel.consume(consumerInfo.queue.name, function (msg) {
                        if (msg !== null) {
                          processor.run(msg, channel, consumerInfo.queue.name)
                                    .then(function () {
                                      channel.ack(msg)
                                    })
                                    .catch(function () {
                                      channel.nack(msg, false, false)
                                    })
                        }
                      })
                    })
            })
  }
}

module.exports = AMQPProvider
