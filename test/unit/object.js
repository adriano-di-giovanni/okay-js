var object = okay.object;

describe('object', function () {
  it('should return false', function () {
    expect(object()()).to.be.false;
  });
  it('should return true', function () {
    expect(object()({})).to.be.true;
  });
});
