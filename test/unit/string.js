var string = okay.string;

describe('string', function () {
  it('should return false', function () {
    expect(string()()).to.be.false;
  });
  it('should return true', function () {
    expect(string()('')).to.be.true;
  });
});
