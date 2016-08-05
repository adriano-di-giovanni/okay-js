var pattern = okay.pattern;

module.exports = function () {
  describe('pattern', function () {
    it('should throw an error if ' +
      '`param` is not a regular expression', function () {
      expect(function () {
        pattern('');
      }).to.throw('`param` is not a regular expression');
    });
    it('should return false', function () {
      expect(pattern(/^\d*$/)('abc')).to.be.false;
    });
    it('should return true', function () {
      expect(pattern(/^\D*$/)('abc')).to.be.true;
    });
  });
};
