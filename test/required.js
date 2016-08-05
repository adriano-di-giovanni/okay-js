var required = okay.required;

module.exports = function () {
  describe('required', function () {
    it('should return false', function () {
      expect(required()()).to.be.false;
    });
    it('should return true', function () {
      expect(required()(0)).to.be.true;
    });
  });
};
