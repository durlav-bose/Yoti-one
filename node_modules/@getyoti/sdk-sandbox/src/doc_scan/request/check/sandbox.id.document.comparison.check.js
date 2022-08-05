'use strict';

const { Validation } = require('../../../util');
const SandboxCheck = require('./sandbox.check');
const SandboxDocumentFilter = require('../sandbox.document.filter');

class SandboxIdDocumentComparisonCheck extends SandboxCheck {
  /**
   * @param {SandboxCheckResult} result
   * @param {SandboxDocumentFilter} secondaryDocumentFilter
   */
  constructor(result, secondaryDocumentFilter) {
    super(result);

    if (secondaryDocumentFilter) {
      Validation.instanceOf(secondaryDocumentFilter, SandboxDocumentFilter, 'documentFilter');
      this.secondaryDocumentFilter = secondaryDocumentFilter;
    }
  }

  toJSON() {
    const json = super.toJSON();
    json.secondary_document_filter = this.secondaryDocumentFilter;
    return json;
  }
}

module.exports = SandboxIdDocumentComparisonCheck;
