/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var configuration = require('rduk-configuration');
var provider = require('./provider');
var Promise = require('bluebird');
var BrokerSection = require('./configuration/brokerSection');

var Broker = function() {
    this.config = configuration.load().getSection('broker', BrokerSection);
};

Broker.prototype.publish = function(to, routingKey, content, options) {
    var self = this;

    return new Promise(function(resolve, reject) {
        var exchange;
        try {
            exchange = self.config.exchanges.get(to);
            resolve(exchange);
        } catch(e) {
            reject(e);
        }
    }).then(function(exchange) {
        return provider.getInstance().publish(exchange, routingKey, content, options);
    });
};

Broker.prototype.consume = function(name) {
    var consumer = this.config.consumers.get(name);
    provider.getInstance().consume(consumer);
};

module.exports = new Broker();
