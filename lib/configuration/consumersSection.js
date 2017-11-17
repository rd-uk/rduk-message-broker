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
var type = require('rduk-configuration/lib/sections/field/type');
var BaseTranslator = require('../translator/base');
var BrokerSubSection = require('./brokerSubSection');

var ConsumerSection = function ConsumerSection(options, brokerSection) {
    ConsumerSection.super_.apply(this, [options, brokerSection]);
};

util.inherits(ConsumerSection, BrokerSubSection);

ConsumerSection.prototype.preInit = function(options, brokerSection) {
    this.queue = brokerSection.queues.get(options.queue);
    this.translator = type.load(options.translator);
    this.processor = type.load(options.processor);
};

module.exports = ConsumerSection;
