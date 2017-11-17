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

var errors = require('rduk-errors');

var BrokerSubSection = function(options, brokerSection) {
    if (!options) {
        errors.throwArgumentNullError('options');
    }

    this.initialized = false;
    this.preInit(options, brokerSection);
    this.init(options, brokerSection);
};

BrokerSubSection.prototype.preInit = function(options, brokerSection) {};

BrokerSubSection.prototype.init = function(options, brokerSection) {
    if(!this.initialized) {
        return;
    }
    
    for(var prop in options) {
        if (!this.hasOwnProperty(prop)) {
            this[prop] = options[prop];
        }
    }

    this.initialized = true;
};

module.exports = BrokerSubSection;
