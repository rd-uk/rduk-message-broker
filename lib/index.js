/**
 * MIT License
 * 
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
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

var configuration = require('@rduk/configuration');
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
