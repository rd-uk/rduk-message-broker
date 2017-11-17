/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 */

'use strict';

var genericPool = require('generic-pool');
var amqp = require('amqplib');
var Promise = require('bluebird');

function poolFactory(url, options) {

  var factory = {
    create: function() {
      return new Promise(function(resolve){
        resolve(amqp.connect(url));
      });
    },
    destroy: function(connection){
      return new Promise(function(resolve){
        resolve(connection.close());
      });
    }
  };

  return genericPool.createPool(factory, options);
}

module.exports = {
  create: function(url, options) {
    return poolFactory(url, options);
  }
};

