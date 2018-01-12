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

'use strict';

const errors = require('@rduk/errors');
const BaseTranslator = require('../lib/translator/base');
const DefaultTranslator = require('../lib/translator/default');
const JSONTranslator = require('../lib/translator/json');
const test = require('./helpers/test');

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
                        test(result, 'test', done);
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
                            test(result.message, 'hello', done)
                        });
                });
            });

            describe('with well format json', function() {
                it('should reject Promise', function(done) {
                    var translator = new JSONTranslator();
                    translator.translate('{"error"}')
                        .catch(function(e) {
                            expect(e).toBeDefined();
                            done();
                        });
                });
            });
        });

    });

});
