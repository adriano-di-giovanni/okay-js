var number = okay.number;

module.exports = function () {
  describe('number', function () {
    it('should return false', function () {
      expect(number()()).to.be.false;
    });
    it('should return true', function () {
      expect(number()(0)).to.be.true;
    });
  });
};
