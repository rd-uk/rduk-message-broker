/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');
var BrokerSubSection = require('../lib/configuration/brokerSubSection');
var BrokerSection = require('../lib/configuration/brokerSection');

describe('configuration - ', function() {

    describe('broker sub section :', function() {
        
        describe('initialization without options', function() {
            it('should throw an ArgumentNullError', function() {
                expect(function() {
                    new BrokerSubSection();
                }).toThrowError(errors.ArgumentNullError);
            });
        });
        
        describe('init method called', function() {
            it('should init Values', function() {
                var subSection = new BrokerSubSection({
                    test: {name: 'test'}
                });

                expect(subSection).toBeDefined();
                expect(subSection.test).toBeDefined();
                expect(subSection.test.name).toBe('test');

                subSection.init({
                    test: {
                        name: 'hello',
                        fake: 'world'
                    }
                });

                expect(subSection.test.name).toBe('test');
                expect(subSection.test.fake).toBeUndefined();
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
