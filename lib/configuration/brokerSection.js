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
var ProviderSection = require('rduk-provider/lib/section');
var ConsumerSection = require('./consumerSection');

var BrokerSection = function BrokerSection(section) {
    BrokerSection.super_.call(this, section);

    var self = this;

    ['exchanges', 'queues'].forEach(function(prop) {
        self[prop] = {
            get: function(name) {
                if (!section.hasOwnProperty(prop) || !section[prop].hasOwnProperty(name)) {
                    errors.throwConfigurationError('exchange "' + name + '" not found');
                }
                
                return section[prop][name];
            }
        };
    });

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
