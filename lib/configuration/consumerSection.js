/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var errors = require('rduk-errors');
var type = require('rduk-configuration/lib/sections/field/type');
var BaseTranslator = require('../translator/base');

var ConsumerSection = function(options, queue) {
    if (!options) {
        errors.throwArgumentNullError('options');
    }

    this.queue = queue;
    this.translator = type.load(options.translator);
    this.processor = type.load(options.processor);
};

module.exports = ConsumerSection;
