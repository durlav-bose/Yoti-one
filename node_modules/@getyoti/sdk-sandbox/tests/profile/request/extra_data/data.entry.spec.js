const SandboxDataEntry = require('../../../../src/profile/request/extra_data/data.entry');

describe('SandboxDataEntry', () => {
  it('cannot be instantiated', () => {
    expect(() => new SandboxDataEntry())
      .toThrowError(new TypeError('SandboxDataEntry cannot be instantiated'));
  });
});
