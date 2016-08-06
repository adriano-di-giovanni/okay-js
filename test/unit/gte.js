var gte = okay.gte;

describe('gte', function () {
  it('should throw an error if `param` is missing', function () {
    expect(function () {
      gte();
    }).to.throw('`param` is missing');
  });
  it('should return false', function () {
    expect(gte(0)(-1)).to.be.false;
  });
  it('should return true', function () {
    expect(gte(0)(0)).to.be.true;
    expect(gte(0)(1)).to.be.true;
  });
});
