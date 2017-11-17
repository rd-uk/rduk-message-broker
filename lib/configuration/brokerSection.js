/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
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
