'use strict';

const { Validation } = require('../../../util');
const SandboxDocumentFilter = require('../sandbox.document.filter');
const SandboxDocumentTextDataExtractionTaskResult = require('./sandbox.document.text.data.extraction.task.result');

class SandboxDocumentTextDataExtractionTask {
  /**
   * @param {SandboxDocumentTextDataExtractionTaskResult} result
   * @param {SandboxDocumentFilter} documentFilter
   */
  constructor(result, documentFilter) {
    Validation.instanceOf(result, SandboxDocumentTextDataExtractionTaskResult, 'result');
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

module.exports = SandboxDocumentTextDataExtractionTask;
