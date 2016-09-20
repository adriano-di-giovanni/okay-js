var not = okay.not;

describe('not', function () {
  it.only('should return false', function () {
    var rule = not(
      sinon.stub().returns(true)
    );
    expect(rule()).to.be.false;
  });
  it('should return true', function () {
    var rule = not(
      sinon.stub().returns(false)
    );
    expect(rule()).to.be.true;
  });
});
