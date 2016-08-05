var string = okay.string;

module.exports = function () {
  describe('string', function () {
    it('should return false', function () {
      expect(string()()).to.be.false;
    });
    it('should return true', function () {
      expect(string()('')).to.be.true;
    });
  });
};
