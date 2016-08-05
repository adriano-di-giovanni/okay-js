var _ = require('lodash');

var noop = _.noop;

var createRule = okay.createRule;

module.exports = function () {
  describe('createRule', function () {
    context('rule creator', function () {
      it('should be exported as a function', function () {
        expect(createRule).to.be.a.function;
      });
      it('should throw an error if ' +
        'resolve argument is missing', function () {
        expect(function () {
          createRule();
        }).to.throw();
      });
      it('should throw an error if ' +
        'resolve argument is not a function', function () {
        expect(function () {
          createRule('');
        }).to.throw();
      });
      it('should return a function', function () {
        expect(createRule(noop)).to.be.a.function;
      });
    });

    context('rule', function () {
      it('should throw an error if ' +
        'a non-boolean value is returned', function () {
        var rule = createRule(function () { return void 0; });
        expect(rule).to.throw();
      });
      it('should return false', function () {
        var rule = createRule(function () { return false; });
        expect(rule()).to.be.false;
      });
      it('should return true', function () {
        var rule = createRule(function () { return true; });
        expect(rule()).to.be.true;
      });
      it('should call `resolve`', function () {
        var resolve = sinon.stub().returns(true);
        var param = 0;
        var value = 1;
        var context = {};
        var rule = createRule(resolve, param);
        rule(value, context);
        expect(resolve).to.have.been.calledOnce;
        expect(resolve).to.have.been.calledWith(value, param, context);
      });
      it('should call `param` or `value` of type function', function () {
        var resolve = sinon.stub().returns(true);
        var param = sinon.stub().returns(0);
        var value = sinon.stub().returns(1);
        var rule = createRule(resolve, param);
        var context = {};
        rule(value, context);
        expect(param).to.have.been.calledOnce;
        expect(param).to.have.been.calledWith(context);
        expect(value).to.have.been.calledOnce;
        expect(value).to.have.been.calledWith(context);
        expect(resolve).to.have.been.calledWith(value(), param(), context);
      });
    });
  });
};
