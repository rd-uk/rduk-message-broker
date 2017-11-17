/**
 * Copyright (c) 2017 RDUK <tech@rduk.fr>, All rights reserved.
 * 
 * The above copyright notice shall be included in all copies or substantial
 * portions of the Software.
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

