/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');

function BaseTranslator() {}

BaseTranslator.prototype.translate = function(msg) {
    errors.throwNotImplementedError('translate');
};

module.exports = BaseTranslator;
