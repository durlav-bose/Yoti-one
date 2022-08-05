'use strict';

const { Validation } = require('../../../util');
const SandboxDocumentCheckBuilder = require('./sandbox.document.check.builder');
const SandboxCheckReport = require('./sandbox.check.report');
const SandboxSupplementaryDocTextDataCheck = require('./sandbox.supplementary.doc.text.data.check');
const SandboxSupplementaryDocTextDataCheckResult = require('./sandbox.supplementary.doc.text.data.check.result');

class SandboxSupplementaryDocTextDataCheckBuilder extends SandboxDocumentCheckBuilder {
  /**
   * @param {string} key
   * @param {*} value
   *
   * @returns {this}
   */
  withDocumentField(key, value) {
    Validation.isString(key, 'key');
    this.documentFields = this.documentFields || {};
    this.documentFields[key] = value;
    return this;
  }

  /**
   * @param {Object.<string,*>} documentFields
   *
   * @returns {this}
   */
  withDocumentFields(documentFields) {
    Validation.instanceOf(documentFields, Object, 'documentFields');
    this.documentFields = documentFields;
    return this;
  }

  /**
   * @returns {SandboxSupplementaryDocTextDataCheck}
   */
  build() {
    const report = new SandboxCheckReport(this.recommendation, this.breakdown);
    const result = new SandboxSupplementaryDocTextDataCheckResult(report, this.documentFields);
    return new SandboxSupplementaryDocTextDataCheck(result, this.documentFilter);
  }
}

module.exports = SandboxSupplementaryDocTextDataCheckBuilder;
