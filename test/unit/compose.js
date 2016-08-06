var compose = okay.compose;

describe('compose', function () {
  it('should be a function', function () {
    expect(compose).to.be.a.function;
  });
  it('should throw an error if rules are missing', function () {
    expect(function () {
      compose();
    }).to.throw('rules are missing');
  });
  it('should throw an error if rules are not of type function', function () {
    expect(function () {
      compose(null);
    }).to.throw('rules must be of type function');
  });
  it('should work', function () {
    var rule = sinon.stub().returns(true);
    var value = 0;
    var context = {};
    expect(compose(rule, rule, rule)(value, context))
      .to.deep.equal([true, true, true]);
    expect(rule).to.have.been.calledThrice;
    expect(rule).to.always.have.been.calledWith(value, context);
  });
});
