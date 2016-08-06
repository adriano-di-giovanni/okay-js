var lte = okay.lte;

describe('lte', function () {
  it('should throw an error if `param` is missing', function () {
    expect(function () {
      lte();
    }).to.throw('`param` is missing');
  });
  it('should return false', function () {
    expect(lte(0)(1)).to.be.false;
  });
  it('should return true', function () {
    expect(lte(0)(0)).to.be.true;
    expect(lte(0)(-1)).to.be.true;
  });
});
