global.chai = require('chai');
global.expect = chai.expect;

global.sinon = require('sinon');

global.okay = require('../okay');

chai.use(require('sinon-chai'));

describe('Unit tests', function () {
  require('./compose')();
  require('./createRule')();
  require('./all')();
  require('./any')();
  require('./callIf')();
  require('./array')();
  require('./boolean')();
  require('./date')();
  require('./email')();
  require('./eq')();
  require('./gt')();
  require('./gte')();
  require('./lt')();
  require('./lte')();
  require('./number')();
  require('./object')();
  require('./partial')();
  require('./pattern')();
  require('./required')();
  require('./string')();
});
