var object = okay.object;

module.exports = function () {
  describe('object', function () {
    it('should return false', function () {
      expect(object()()).to.be.false;
    });
    it('should return true', function () {
      expect(object()({})).to.be.true;
    });
  });
};
