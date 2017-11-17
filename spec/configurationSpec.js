/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
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
