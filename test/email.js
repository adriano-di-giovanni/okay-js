var email = okay.email;

module.exports = function () {
  describe('email', function () {
    it('should return false', function () {
      expect(email()()).to.be.false;
    });
    it('should return true', function () {
      expect(email()('me@adrianodigiovanni.com')).to.be.true;
    });
  });
};
