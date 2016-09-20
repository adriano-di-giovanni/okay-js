var empty = okay.empty;

describe('empty', function () {
  it('should return true', function () {
    expect(empty()(null)).to.be.true;
    expect(empty()(true)).to.be.true;
    expect(empty()(1)).to.be.true;
  });
  it('should return false', function () {
    expect(empty()([1, 2, 3])).to.be.false;
    expect(empty()({ a: 1 })).to.be.false;
  });
});
