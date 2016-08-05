var eq = okay.eq;

module.exports = function () {
  describe('eq', function () {
    it('should return false', function () {
      expect(eq(1)(0)).to.be.false;
    });
    it('should return true', function () {
      expect(eq(void 0)(null)).to.be.true;
      expect(eq(0)('0')).to.be.true;
    });
  });
};
