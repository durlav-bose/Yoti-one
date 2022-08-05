'use strict';

const SandboxCheckBuilder = require('./sandbox.check.builder');
const SandboxZoomLivenessCheck = require('./sandbox.zoom.liveness.check');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxCheckResult = require('./sandbox.check.result');

class SandboxZoomLivenessCheckBuilder extends SandboxCheckBuilder {
  /**
   * @returns {SandboxLivenessCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxCheckResult(report);
    return new SandboxZoomLivenessCheck(result);
  }
}

module.exports = SandboxZoomLivenessCheckBuilder;
