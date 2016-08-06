var array = okay.array;

describe('array', function () {
  it('should return false', function () {
    expect(array()()).to.be.false;
  });
  it('should return true', function () {
    expect(array()([])).to.be.true;
  });
});
