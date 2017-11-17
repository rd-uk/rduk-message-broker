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
