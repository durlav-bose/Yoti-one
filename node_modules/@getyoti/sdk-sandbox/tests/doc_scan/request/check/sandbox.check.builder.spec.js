const SandboxCheckBuilder = require('../../../../src/doc_scan/request/check/sandbox.check.builder');

describe('SandboxCheckBuilder', () => {
  it('Cannot be instantiated', () => {
    expect(() => new SandboxCheckBuilder())
      .toThrow(new Error('SandboxCheckBuilder cannot be instantiated'));
  });
});
