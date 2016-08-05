var all = okay.all;

module.exports = function () {
  describe('all', function () {
    it('should return false', function () {
      var rule = all(
        sinon.stub().returns(true),
        sinon.stub().returns(false)
      );
      expect(rule()).to.be.false;
    });
    it('should return true', function () {
      var rule = all(
        sinon.stub().returns(true),
        sinon.stub().returns(true)
      );
      expect(rule()).to.be.true;
    });
  });
};
