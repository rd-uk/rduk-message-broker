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
