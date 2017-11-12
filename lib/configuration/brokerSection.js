/**
 * MIT License
 *
 * Copyright (c) 2017 Kim Ung <k.ung@rduk.fr>
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

var util = require('util');
var _ = require('lodash');
var errors = require('rduk-errors');
var ProviderSection = require('rduk-provider/lib/section');
var ConsumerSection = require('./consumerSection');

var BrokerSection = function BrokerSection(section) {
    BrokerSection.super_.call(this, section);

    var self = this;

    self.exchanges = {
        get: function(name) {
            if (!section.hasOwnProperty('exchanges') || !section.exchanges.hasOwnProperty(name)) {
                errors.throwConfigurationError('exchange "' + name + '" not found');
            }
            
            return section.exchanges[name];
        }
    };

    self.queues = {
        get: function(name) {
            if (!section.hasOwnProperty('queues') || !section.queues.hasOwnProperty(name)) {
                errors.throwConfigurationError('queue "' + name + '" not found');
            }

            return section.queues[name];
        }
    };

    self.consumers = {
        get: function(name) {
            if (!section.hasOwnProperty('consumers') || !section.consumers.hasOwnProperty(name)) {
                errors.throwConfigurationError('consumer "' + name + '" not found');
            }

            var consumer = section.consumers[name];
            return new ConsumerSection(consumer, self.queues.get(consumer.queue));
        }
    };
};

util.inherits(BrokerSection, ProviderSection);

module.exports = BrokerSection;
