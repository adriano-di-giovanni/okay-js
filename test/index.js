var and = okay.and;
var array = okay.array;
var boolean = okay.boolean;
var invoke = okay.invoke;
var invokeIf = okay.invokeIf;
var invokeIfNot = okay.invokeIfNot;
var createRule = okay.createRule;
var date = okay.date;
var email = okay.email;
var gt = okay.gt;
var gte = okay.gte;
var lt = okay.lt;
var lte = okay.lte;
var number = okay.number;
var object = okay.object;
var pattern = okay.pattern;
var or = okay.or;
var required = okay.required;
var string = okay.string;

describe('unit testing', function () {
  it('createRule', function () {
    expect(createRule).to.be.a.function;
    var param = 0;
    var resolve = function (value, param) {
      return value > param;
    };
    var _resolve = sinon.spy(resolve);
    var validate = createRule({
      param: param,
      resolve: _resolve
    });
    var value = 1;
    expect(validate).to.be.a.function;
    expect(validate.__param).to.equal(param);
    expect(validate(value)).to.be.true;
    expect(_resolve.calledOnce).to.be.true;
    expect(_resolve.calledWith(value, param)).to.be.true;
    param = function () {
      return 0;
    };
    var _param = sinon.spy(param);
    _resolve = sinon.spy(resolve);
    validate = createRule({
      param: _param,
      resolve: _resolve
    });
    expect(validate(value)).to.be.true;
    expect(_param.calledOnce).to.be.true;
    expect(_resolve.calledOnce).to.be.true;
    expect(_resolve.calledWith(value, param())).to.be.true;
  });
  it('and', function () {
    var rule1 = sinon.stub().returns(true);
    var rule2 = sinon.stub().returns(false);

    var validate = and(rule1, rule2);
    expect(validate).to.be.a.function;
    expect(validate(1)).to.be.false;
    expect(rule1.calledOnce).to.be.true;
    expect(rule1.calledWith(1)).to.be.true;
    expect(rule2.calledOnce).to.be.true;
    expect(rule2.calledWith(1)).to.be.true;
  });
  it('array', function () {
    expect(array()()).to.be.false;
    expect(array()([])).to.be.true;
  });
  it('boolean', function () {
    expect(boolean()()).to.be.false;
    expect(boolean()(false)).to.be.true;
    expect(boolean()(true)).to.be.true;
  });
  it('invoke', function () {
    var rule = sinon.spy(function (value) {
      return !! value;
    });
    var ifCallback = sinon.spy();
    var ifNotCallback = sinon.spy();
    var context = {};
    expect(invoke(rule, ifCallback, ifNotCallback, context)(true)).to.be.true;
    expect(rule.calledWith(true)).to.be.true;
    expect(invoke(rule, ifCallback, ifNotCallback, context)(false)).to.be.false;
    expect(rule.calledWith(false));
    expect(rule.calledTwice).to.be.true;
    expect(ifCallback.calledOnce).to.be.true;
    expect(ifCallback.calledWith(true)).to.be.true;
    expect(ifCallback.calledOn(context)).to.be.true;
    expect(ifNotCallback.calledOnce).to.be.true;
    expect(ifNotCallback.calledWith(false)).to.be.true;
    expect(ifNotCallback.calledOn(context)).to.be.true;
  });
  it('invokeIf', function () {
    var rule = sinon.stub().returns(true);
    var callback = sinon.spy();
    var context = {};
    expect(invokeIf(rule, callback, context)(1)).to.be.true;
    expect(rule.calledOnce).to.be.true;
    expect(rule.calledWith(1)).to.be.true;
    expect(callback.calledOnce).to.be.true;
    expect(callback.calledWith(1)).to.be.true;
    expect(callback.calledOn(context)).to.be.true;
  });
  it('invokeIfNot', function () {
    var rule = sinon.stub().returns(false);
    var callback = sinon.spy();
    var context = {};
    expect(invokeIfNot(rule, callback, context)(1)).to.be.false;
    expect(rule.calledOnce).to.be.true;
    expect(rule.calledWith(1)).to.be.true;
    expect(callback.calledOnce).to.be.true;
    expect(callback.calledWith(1)).to.be.true;
    expect(callback.calledOn(context)).to.be.true;
  });
  it('date', function () {
    expect(date()()).to.be.false;
    expect(date()(new Date())).to.be.true;
  });
  it('email', function () {
    expect(email()('a')).to.be.false;
    expect(email()('a@a.it')).to.be.true;
  })
  it('gt', function () {
    expect(gt(0)(1)).to.be.true;
    expect(gt(0)(0)).to.be.false;
  });
  it('gte', function () {
    expect(gte(0)(0)).to.be.true;
    expect(gte(0)(-1)).to.be.false;
  });
  it('lt', function () {
    expect(lt(0)(-1)).to.be.true;
    expect(lt(0)(0)).to.be.false;
  });
  it('lte', function () {
    expect(lte(0)(0)).to.be.true;
    expect(lte(0)(1)).to.be.false;
  });
  it('number', function () {
    expect(number()()).to.be.false;
    expect(number()(0)).to.be.true;
  });
  it('object', function () {
    expect(object()()).to.be.false;
    expect(object()({})).to.be.true;
  });
  it('pattern', function () {
    expect(pattern(/^\d*$/)('a')).to.be.false;
    expect(pattern(/^\d*$/)('0123456789')).to.be.true;
  });
  it('or', function () {
    var rule1 = sinon.stub().returns(false);
    var rule2 = sinon.stub().returns(true);

    var validate = or(rule1, rule2);
    expect(validate).to.be.a.function;
    expect(validate(1)).to.be.true;
    expect(rule1.calledOnce).to.be.true;
    expect(rule1.calledWith(1)).to.be.true;
    expect(rule2.calledOnce).to.be.true;
    expect(rule2.calledWith(1)).to.be.true;
  });
  it('required', function () {
    expect(required()()).to.be.false;
    expect(required()('')).to.be.false;
    expect(required()('value')).to.be.true;
  });
  it('string', function () {
    expect(string()()).to.be.false;
    expect(string()('')).to.be.true;
  });
});
