'use strict';

const SandboxDocumentCheckBuilder = require('./sandbox.document.check.builder');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxCheckResult = require('./sandbox.check.result');
const SandboxThirdPartyIdentityCheck = require('./sandbox.third.party.identity.check');

class SandboxThirdPartyIdentityCheckBuilder extends SandboxDocumentCheckBuilder {
  /**
   * @returns {SandboxThirdPartyIdentityCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxCheckResult(report);
    return new SandboxThirdPartyIdentityCheck(result);
  }
}

module.exports = SandboxThirdPartyIdentityCheckBuilder;
