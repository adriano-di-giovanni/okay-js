global._ = require('lodash');
global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.okay = require('../okay');
chai.use(require('sinon-chai'));
