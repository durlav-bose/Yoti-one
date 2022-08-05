'use strict';

const SandboxDocumentCheckBuilder = require('./sandbox.document.check.builder');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxCheckResult = require('./sandbox.check.result');
const SandboxIdDocumentComparisonCheck = require('./sandbox.id.document.comparison.check');

class SandboxIdDocumentComparisonCheckBuilder extends SandboxDocumentCheckBuilder {
  /**
   * @param {SandboxDocumentFilter} secondaryDocumentFilter
   *
   * @returns {this}
   */
  withSecondaryDocumentFilter(secondaryDocumentFilter) {
    this.secondaryDocumentFilter = secondaryDocumentFilter;
    return this;
  }

  /**
   * @returns {SandboxIdDocumentComparisonCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxCheckResult(report);
    return new SandboxIdDocumentComparisonCheck(result, this.secondaryDocumentFilter);
  }
}

module.exports = SandboxIdDocumentComparisonCheckBuilder;
