/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
var errors = require('rduk-errors');
var base = require('./base');

function DefaultProcessor(translator) {
    DefaultProcessor.super_.call(this, translator);
}

util.inherits(DefaultProcessor, base);

DefaultProcessor.prototype.run = function(msg) {
    if (!msg || !msg.content) {
        errors.throwArgumentError('msg', msg);
    }

    return this.translator.translate(msg.content)
        .then(function(msg) {
            return msg;
        });
};

module.exports = DefaultProcessor;
