/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
var base = require('./base');
var Promise = require('bluebird');

var DefaultTranslator = function DefaultTranslator() {
    DefaultTranslator.super_.call(this);
};

util.inherits(DefaultTranslator, base);

DefaultTranslator.prototype.translate = function(content) {
    return new Promise(function(resolve) {
        resolve(content);
    });
};

module.exports = DefaultTranslator;
