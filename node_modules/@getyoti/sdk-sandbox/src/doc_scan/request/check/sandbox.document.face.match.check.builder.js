'use strict';

const SandboxDocumentCheckBuilder = require('./sandbox.document.check.builder');
const SandboxDocumentFaceMatchCheck = require('./sandbox.document.face.match.check');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxCheckResult = require('./sandbox.check.result');

class SandboxDocumentFaceMatchCheckBuilder extends SandboxDocumentCheckBuilder {
  /**
   * @returns {SandboxDocumentFaceMatchCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxCheckResult(report);
    return new SandboxDocumentFaceMatchCheck(result, this.documentFilter);
  }
}

module.exports = SandboxDocumentFaceMatchCheckBuilder;
