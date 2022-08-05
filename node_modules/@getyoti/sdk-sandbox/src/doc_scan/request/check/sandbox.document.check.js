'use strict';

const { Validation } = require('../../../util');
const SandboxCheck = require('./sandbox.check');
const SandboxDocumentFilter = require('../sandbox.document.filter');

class SandboxDocumentCheck extends SandboxCheck {
  /**
   * @param {SandboxCheckResult} result
   * @param {SandboxDocumentFilter} documentFilter
   */
  constructor(result, documentFilter) {
    if (new.target === SandboxDocumentCheck) {
      throw TypeError('SandboxDocumentCheck cannot be instantiated');
    }

    super(result);

    if (documentFilter) {
      Validation.instanceOf(documentFilter, SandboxDocumentFilter, 'documentFilter');
      this.documentFilter = documentFilter;
    }
  }

  toJSON() {
    const json = super.toJSON();
    json.document_filter = this.documentFilter;
    return json;
  }
}

module.exports = SandboxDocumentCheck;
