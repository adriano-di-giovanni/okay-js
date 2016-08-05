var gt = okay.gt;

module.exports = function () {
  describe('gt', function () {
    it('should throw an error if `param` is missing', function () {
      expect(function () {
        gt();
      }).to.throw('`param` is missing');
    });
    it('should return false', function () {
      expect(gt(0)(0)).to.be.false;
      expect(gt(0)(-1)).to.be.false;
    });
    it('should return true', function () {
      expect(gt(0)(1)).to.be.true;
    });
  });
};
