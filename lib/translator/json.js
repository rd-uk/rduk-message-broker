/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
var base = require('./base');
var Promise = require('bluebird');

var JSONTranslator = function JSONTranslator() {
    JSONTranslator.super_.call(this);
};

util.inherits(JSONTranslator, base);

JSONTranslator.prototype.translate = function(content) {
    return new Promise(function(resolve, reject) {
        try {
            var obj = JSON.parse(content.toString());
            resolve(obj);
        } catch(e) {
            reject(e);
        }
    });
};

module.exports = JSONTranslator;
