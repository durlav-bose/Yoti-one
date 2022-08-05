'use strict';

const { Validation } = require('../../util');
const SandboxDocumentTextDataExtractionTask = require('./task/sandbox.document.text.data.extraction.task');
const SandboxSupplementaryDocTextDataExtractionTask = require('./task/sandbox.supplementary.doc.text.data.extraction.task');

class SandboxTaskResults {
  /**
   * @param {SandboxDocumentTextDataExtractionTask[]} documentTextDataExtractionTasks
   * @param {SandboxSupplementaryDocTextDataExtractionTask[]} supplementaryDocTextExtractionTasks
   */
  constructor(
    documentTextDataExtractionTasks,
    supplementaryDocTextExtractionTasks
  ) {
    Validation.isArrayOfType(
      documentTextDataExtractionTasks,
      SandboxDocumentTextDataExtractionTask,
      'documentTextDataExtractionTasks'
    );
    this.documentTextDataExtractionTasks = documentTextDataExtractionTasks;

    if (supplementaryDocTextExtractionTasks) {
      Validation.isArrayOfType(
        supplementaryDocTextExtractionTasks,
        SandboxSupplementaryDocTextDataExtractionTask,
        'supplementaryDocTextExtractionTasks'
      );
      this.supplementaryDocTextExtractionTasks = supplementaryDocTextExtractionTasks;
    }
  }

  toJSON() {
    return {
      ID_DOCUMENT_TEXT_DATA_EXTRACTION: this.documentTextDataExtractionTasks,
      SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION: this.supplementaryDocTextExtractionTasks,
    };
  }
}

module.exports = SandboxTaskResults;
