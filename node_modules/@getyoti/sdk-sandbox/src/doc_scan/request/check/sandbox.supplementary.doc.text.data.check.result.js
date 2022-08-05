'use strict';

const SandboxCheckResult = require('./sandbox.check.result');

class SandboxSupplementaryDocTextDataCheckResult extends SandboxCheckResult {
  /**
   * @param {SandboxCheckReport} report
   * @param {Object.<string,*>} documentFields
   */
  constructor(report, documentFields) {
    super(report);

    this.documentFields = documentFields;
  }

  toJSON() {
    return Object.assign(
      super.toJSON(),
      {
        document_fields: this.documentFields,
      }
    );
  }
}

module.exports = SandboxSupplementaryDocTextDataCheckResult;
