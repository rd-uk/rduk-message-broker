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

const errors = require('@rduk/errors')
const BaseProvider = require('@rduk/provider/lib/base')

class BaseBrokerProvider extends BaseProvider {
  initialize () {}

  /**
   * publish (exchange, routingKey, messages, options)
   *
   * publish message to an exchange
   *
   * @param string exchange
   * @param string routingKey
   * @param Object[] messages
   * @param string messages.content
   * @param Object messages.options
   * @param Object messages.options.headers
   * @param Object defaultOptions
   */
  publish (exchange, routingKey, messages, defaultOptions) {
    errors.throwNotImplementedError('publish')
  }

  /**
   * consume (consumerInfo)
   *
   * consume messages
   *
   * @param Object consumerInfo
   * @param Object consumerInfo.queue
   * @param string consumerInfo.queue.name
   * @param Class consumerInfo.translator
   * @param Class consumerInfo.processor
   */
  consume (consumerInfo) {
    errors.throwNotImplementedError('consume')
  }
}

module.exports = BaseBrokerProvider
