var lt = okay.lt;

describe('lt', function () {
  it('should throw an error if `param` is missing', function () {
    expect(function () {
      lt();
    }).to.throw('`param` is missing');
  });
  it('should return false', function () {
    expect(lt(0)(0)).to.be.false;
    expect(lt(0)(1)).to.be.false;
  });
  it('should return true', function () {
    expect(lt(0)(-1)).to.be.true;
  });
});
