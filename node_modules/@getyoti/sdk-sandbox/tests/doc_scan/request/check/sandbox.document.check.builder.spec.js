const SandboxDocumentCheckBuilder = require('../../../../src/doc_scan/request/check/sandbox.document.check.builder');

describe('SandboxDocumentCheckBuilder', () => {
  it('Cannot be instantiated', () => {
    expect(() => new SandboxDocumentCheckBuilder())
      .toThrow(new Error('SandboxDocumentCheckBuilder cannot be instantiated'));
  });
});
