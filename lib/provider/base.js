/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
var errors = require('rduk-errors');
var base = require('rduk-provider/lib/base');

var BaseProvider = function BaseProvider(config) {
    BaseProvider.super_.call(this, config);

    this.initialize();
};

BaseProvider.prototype.initialize = function() {};

util.inherits(BaseProvider, base);

BaseProvider.prototype.publish = function(exchange, routingKey, content, options) {
    errors.throwNotImplementedError('publish');
};

BaseProvider.prototype.consume = function(consumer) {
    errors.throwNotImplementedError('consume');
};

module.exports = BaseProvider;
