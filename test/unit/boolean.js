var boolean = okay.boolean;

describe('boolean', function () {
  it('should return false', function () {
    expect(boolean()()).to.be.false;
  });
  it('should return true', function () {
    expect(boolean()(false)).to.be.true;
    expect(boolean()(true)).to.be.true;
  });
});
