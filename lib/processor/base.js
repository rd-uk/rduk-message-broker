/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');
var BaseTranslator = require('../translator/base');

function BaseProcessor(translator) {
    if (!translator || !(translator instanceof BaseTranslator)) {
        errors.throwArgumentError('translator', translator);
    }

    this.translator = translator;
}

BaseProcessor.prototype.run = function(msg) {
    errors.throwNotImplementedError('translate');
};

module.exports = BaseProcessor;
