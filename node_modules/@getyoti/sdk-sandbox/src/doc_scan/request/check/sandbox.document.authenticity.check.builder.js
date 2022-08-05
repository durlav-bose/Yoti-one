'use strict';

const SandboxDocumentCheckBuilder = require('./sandbox.document.check.builder');
const SandboxDocumentAuthenticityCheck = require('./sandbox.document.authenticity.check');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxCheckResult = require('./sandbox.check.result');

class SandboxDocumentAuthenticityCheckBuilder extends SandboxDocumentCheckBuilder {
  /**
   * @returns {SandboxDocumentAuthenticityCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxCheckResult(report);
    return new SandboxDocumentAuthenticityCheck(result, this.documentFilter);
  }
}

module.exports = SandboxDocumentAuthenticityCheckBuilder;
