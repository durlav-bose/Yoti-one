'use strict';

const { Validation } = require('../../../util');
const SandboxDocumentFilter = require('../sandbox.document.filter');
const SandboxSupplementaryDocTextDataExtractionTaskResult = require('./sandbox.supplementary.doc.text.data.extraction.task.result');

class SandboxSupplementaryDocTextDataExtractionTask {
  /**
   * @param {SandboxSupplementaryDocTextDataExtractionTaskResult} result
   * @param {SandboxDocumentFilter} documentFilter
   */
  constructor(result, documentFilter) {
    Validation.instanceOf(result, SandboxSupplementaryDocTextDataExtractionTaskResult, 'result');
    this.result = result;

    if (documentFilter) {
      Validation.instanceOf(documentFilter, SandboxDocumentFilter, 'documentFilter');
      this.documentFilter = documentFilter;
    }
  }

  toJSON() {
    return {
      result: this.result,
      document_filter: this.documentFilter,
    };
  }
}

module.exports = SandboxSupplementaryDocTextDataExtractionTask;
