/**
 * MIT License
 *
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
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

/* eslint-env jasmine */

'use strict'

describe('Provider', function () {
  const errors = require('@rduk/errors')

  describe('Base', function () {
    const BaseProvider = require('../lib/provider/base')

    let provider = new BaseProvider({
      name: 'fake'
    })

    describe('publish', function () {
      it('should throw a NotImplementedError', function () {
        expect(function () {
          provider.publish()
        }).toThrowError(errors.NotImplementedError)
      })
    })

    describe('consume', function () {
      it('should throw a NotImplementedError', function () {
        expect(function () {
          provider.consume()
        }).toThrowError(errors.NotImplementedError)
      })
    })
  })

  describe('AMQP', function () {
    const AMQPProvider = require('../lib/provider/amqp')
    const MockChannel = require('./mocks/channel')
    const MockProcessor = require('./mocks/processor')
    const DefaultTranslator = require('../lib/translator/default')

    let provider = new AMQPProvider({
      name: 'fake',
      poolFactory: {
        create: (address, config) => ({
          name: 'pool',
          acquire: () => (Promise.resolve({
            createChannel: () => ({
              name: 'channel',
              assertExchange: () => (Promise.resolve({})),
              publish: () => ('published'),
              close: () => Promise.resolve(true)
            })
          })),
          release: () => {}
        })
      }
    })

    describe('pool property', function () {
      it('should return "pool"', function () {
        expect(provider.pool.name).toBe('pool')
        expect(provider.pool.name).toBe('pool')
      })
    })

    describe('createChannel', function () {
      it('should return a channel', function (done) {
        provider.createChannel()
          .then(channel => {
            expect(channel.name).toBe('channel')
            done()
          })
      })
    })

    describe('initialize', function () {
      it('should success', function () {
        spyOn(provider, 'initialize').and.callThrough()
        provider.initialize()
        expect(provider.initialize).toHaveBeenCalled()
      })
    })

    describe('publish', function () {
      it('should success', function (done) {
        provider.publish({}, 'routingKey', {'name': 'test'})
          .then(result => {
            expect(Array.isArray(result)).toBe(true)
            expect(result[0]).toBe('published')
            done()
          })
      })
    })

    describe('consume', function () {
      it('should success', function (done) {
        spyOn(provider, 'createChannel').and.returnValue(Promise.resolve(new MockChannel('success')))
        spyOn(provider, 'emit').and.callThrough()

        provider.on('MESSAGE_SUCCESS', msg => {
          expect(provider.emit).toHaveBeenCalled()
          done()
        })

        provider.consume({
          queue: {
            name: 'test'
          },
          translator: DefaultTranslator,
          processor: MockProcessor
        })
      })

      it('should success', function (done) {
        spyOn(provider, 'createChannel').and.returnValue(Promise.resolve(new MockChannel('error')))
        spyOn(provider, 'emit').and.callThrough()

        provider.on('MESSAGE_FAILURE', msg => {
          expect(provider.emit).toHaveBeenCalled()
          done()
        })

        provider.consume({
          queue: {
            name: 'test'
          },
          translator: DefaultTranslator,
          processor: MockProcessor
        })
      })
    })
  })
})
