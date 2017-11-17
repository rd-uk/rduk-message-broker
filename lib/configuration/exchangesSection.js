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
var BrokerSubSection = require('./brokerSubSection');

var ExchangesSection = function ExchangesSection(options, brokerSection) {
    ExchangesSection.super_.apply(this, [options, brokerSection]);
};

util.inherits(ExchangesSection, BrokerSubSection);

module.exports = ExchangesSection;
