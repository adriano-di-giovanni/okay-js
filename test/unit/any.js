var any = okay.any;

describe('any', function () {
  it('should return true', function () {
    var rule = any(
      sinon.stub().returns(true),
      sinon.stub().returns(false)
    );
    expect(rule()).to.be.true;
  });
  it('should return false', function () {
    var rule = any(
      sinon.stub().returns(false),
      sinon.stub().returns(false)
    );
    expect(rule()).to.be.false;
  });
});
