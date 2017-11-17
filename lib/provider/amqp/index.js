/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var util = require('util');
var base = require('../base');
var amqp = require('amqplib');
var poolFactory = require('./pool');

var AMQPProvider = function AMQPProvider(config) {
    AMQPProvider.super_.call(this, config);
    
    var self = this, address = self.config.address, pool;

    Object.defineProperty(self, 'pool', {
        get: function() {
            if (!pool) {
                pool = poolFactory.create(address, self.config);
            }

            return pool;
        },
        configurable: true
    });
};

util.inherits(AMQPProvider, base);

AMQPProvider.prototype.publish = function(exchangeInfo, routingKey, content, options) {
    content = JSON.stringify(content);

    return this.pool.acquire()
        .then(function(connection) {
            return connection.createChannel();
        })
        .then(function(channel) {
            return channel.assertExchange(exchangeInfo.name, exchangeInfo.type, exchangeInfo.options)
                .then(function(ok) {
                    return channel.publish(exchangeInfo.name, routingKey, new Buffer(content), options);
                });
        });
};

AMQPProvider.prototype.consume = function(consumerInfo) {
    return this.pool.acquire()
        .then(function(connection) {
            return connection.createChannel();
        })
        .then(function(channel) {
            return channel.assertQueue(consumerInfo.queue.name)
                .then(function() {
                    var processor = new consumerInfo.processor(new consumerInfo.translator());

                    return channel.consume(consumerInfo.queue.name, function(msg) {
                        if (msg !== null) {
                            processor.run(msg)
                                .then(function() {
                                    channel.ack(msg);
                                })
                                .catch(function(){
                                    channel.nack(msg);
                                });
                        }
                    });
                });
        });
};

module.exports = AMQPProvider;
