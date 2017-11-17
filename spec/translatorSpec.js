/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');
var BaseTranslator = require('../lib/translator/base');
var DefaultTranslator = require('../lib/translator/default');
var JSONTranslator = require('../lib/translator/json');

describe('Translator', function() {

    describe('Base', function() {
        
        describe('method translate called', function() {
            it('should throw a NotImplementedError', function() {
                expect(function() {
                    var translator = new BaseTranslator();
                    translator.translate('test');
                }).toThrowError(errors.NotImplementedError);
            });
        });

    });

    describe('Default', function() {
        
        describe('method translate called', function() {
            it('should success', function(done) {
                var translator = new DefaultTranslator();
                translator.translate('test')
                    .then(function(result) {
                        expect(result).toBe('test');
                        done();
                    });
            });
        });

    });

    describe('JSON', function() {
        
        describe('method translate called', function() {

            describe('with well format json', function() {
                it('should resolve Promise', function(done) {
                    var translator = new JSONTranslator();
                    translator.translate('{"message":"hello"}')
                        .then(function(result) {
                            expect(result.message).toBe('hello');
                            done();
                        });
                });
            });

            describe('with well format json', function() {
                it('should reject Promise', function(done) {
                    var translator = new JSONTranslator();
                    translator.translate('{"error"}')
                        .catch(function(e) {
                            expect(e).toBeDefined();
                        })
                        .finally(function() {
                            done();
                        });
                });
            });
        });

    });

});
