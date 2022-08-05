const SandboxLivenessCheck = require('../../../../src/doc_scan/request/check/sandbox.liveness.check');

describe('SandboxLivenessCheck', () => {
  it('Cannot be instantiated', () => {
    expect(() => new SandboxLivenessCheck())
      .toThrow(new TypeError('SandboxLivenessCheck cannot be instantiated'));
  });
});
