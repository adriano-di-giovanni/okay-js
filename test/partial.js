var _ = require('lodash');

module.exports = function () {
  describe('partial', function () {
    expect(okay.partial).to.equal(_.partial);
  });
};
