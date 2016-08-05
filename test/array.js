var array = okay.array;

module.exports = function () {
  describe('array', function () {
    it('should return false', function () {
      expect(array()()).to.be.false;
    });
    it('should return true', function () {
      expect(array()([])).to.be.true;
    });
  });
};
