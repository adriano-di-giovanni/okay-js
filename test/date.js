var date = okay.date;

module.exports = function () {
  describe('date', function () {
    it('should return false', function () {
      expect(date()()).to.be.false;
    });
    it('should return true', function () {
      expect(date()(new Date())).to.be.true;
    });
  });
};
