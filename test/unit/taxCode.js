var taxCode = okay.taxCode;

describe('taxCode', function () {
  it('should throw an error', function () {
    expect(function () {
      taxCode();
    }).to.throw(Error);
  });
  context('it', function () {
    var validate = taxCode('it');
    it('should return true', function () {
      expect(validate('DGVDRN78E02H501C')).to.be.true;
    });
  });
});
