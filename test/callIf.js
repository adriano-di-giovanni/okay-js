var _ = require('lodash');

var noop = _.noop;
var callIf = okay.callIf;

module.exports = function () {
  describe('callIf', function () {
    it('should throw an error if `rule` is not a function', function () {
      expect(function () {
        callIf();
      }).to.throw('`rule` is not a function');
    });
    it('should throw an error if ' +
      '`thenCallback` is provided and is not a function', function () {
      expect(function () {
        callIf(noop, {});
      }).to.throw('`thenCallback` is not a function');
    });
    it('should throw an error if ' +
      '`elseCallback` is provided and is not a function', function () {
      expect(function () {
        callIf(noop, null, {});
      }).to.throw('`elseCallback` is not a function');
    });
    it('should call `rule` and `thenCallback`', function () {
      var rule = sinon.stub().returns(true);
      var thenCallback = sinon.spy();
      callIf(rule, thenCallback)();
      expect(rule).to.have.been.calledOnce;
      expect(thenCallback).to.have.been.calledOnce;
    });
    it('should call `rule` and `elseCallback`', function () {
      var rule = sinon.stub().returns(false);
      var elseCallback = sinon.spy();
      callIf(rule, null, elseCallback)();
      expect(rule).to.have.been.calledOnce;
      expect(elseCallback).to.have.been.calledOnce;
    });
  });
};
