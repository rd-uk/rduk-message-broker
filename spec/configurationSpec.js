/**
 * MIT License
 *
 * Copyright (c) 2017 RDUK <k.ung@rduk.fr>
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

'use strict';

var errors = require('rduk-errors');
var ConsumerSection = require('../lib/configuration/consumerSection');
var BrokerSection = require('../lib/configuration/brokerSection');

describe('configuration - ', function() {

    describe('consumer section :', function() {
        
        describe('initialization without options', function() {
            it('should throw an ArgumentNullError', function() {
                expect(function() {
                    new ConsumerSection();
                }).toThrowError(errors.ArgumentNullError);
            });
        });

    });

    describe('broker section :', function() {

        describe('exchange', function() {
            var section = new BrokerSection({
                default: 'test',
                providers: [{name: 'test'}],
                exchanges: {
                    test: {name: 'test'}
                }
            });

            describe('get with bad argument', function() {
                it('should throw a configuration error', function() {
                    expect(function() {
                        section.exchanges.get('error');
                    }).toThrowError(errors.ConfigurationError);
                });
            });

            describe('get with correct argument', function() {
                it('should success', function() {
                    var exchange = section.exchanges.get('test');
                    expect(exchange.name).toBe('test');
                });
            });
        });

        describe('queue', function() {
            var section = new BrokerSection({
                default: 'test',
                providers: [{name: 'test'}],
                queues: {
                    test: {name: 'test'}
                }
            });

            describe('get with bad argument', function() {
                it('should throw a configuration error', function() {
                    expect(function() {
                        section.queues.get('error');
                    }).toThrowError(errors.ConfigurationError);
                });
            });

            describe('get with correct argument', function() {
                it('should success', function() {
                    var exchange = section.queues.get('test');
                    expect(exchange.name).toBe('test');
                });
            });
        });

        describe('consumer', function() {
            var section = new BrokerSection({
                default: 'test',
                providers: [{name: 'test'}],
                queues: {
                    test: {name: 'test'}
                },
                consumers: {
                    test: {
                        queue: 'test',
                        translator: '~/lib/translator/default',
                        processor: '~/lib/processor/default'
                    }
                }
            });

            describe('get with bad argument', function() {
                it('should throw a configuration error', function() {
                    expect(function() {
                        section.consumers.get('error');
                    }).toThrowError(errors.ConfigurationError);
                });
            });

            describe('get with correct argument', function() {
                it('should success', function() {
                    var consumer = section.consumers.get('test');
                    expect(consumer.queue.name).toBe('test');
                });
            });
        });

    });
    
});
