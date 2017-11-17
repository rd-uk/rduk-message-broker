/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');
var BaseProcessor = require('../lib/processor/base');
var DefaultProcessor = require('../lib/processor/default');
var DefaultTranslator = require('../lib/translator/default');

describe('Processor', function() {

    describe('Base', function() {
        
        describe('initialization without argument', function() {
            it('should throw an ArgumentError', function() {
                expect(function() {
                    new BaseProcessor();
                }).toThrowError(errors.ArgumentError);
            });
        });
        
        describe('initialization with bad argument', function() {
            it('should throw an ArgumentError', function() {
                expect(function() {
                    new BaseProcessor({});
                }).toThrowError(errors.ArgumentError);
            });
        });

        describe('method run called', function() {
            it('should throw a NotImplementedError', function() {
                expect(function() {
                    var processor = new BaseProcessor(new DefaultTranslator());
                    processor.run();
                }).toThrowError(errors.NotImplementedError);
            });
        });

    });

    describe('Default', function() {

        describe('method run called', function() {
            var processor = new DefaultProcessor(new DefaultTranslator());

            describe('with bad argument', function() {
                it('should throw an ArgumentError', function() {
                    expect(function() {
                        processor.run();
                    }).toThrowError(errors.ArgumentError);

                    expect(function() {
                        processor.run({});
                    }).toThrowError(errors.ArgumentError);
                });
            });

            describe('correctly', function() {
                it('should success', function(done) {
                    processor.run({content: 'test'})
                        .then(function(result) {
                            expect(result).toBe('test');
                            done();
                        });
                });
            });

        });

    });

});
