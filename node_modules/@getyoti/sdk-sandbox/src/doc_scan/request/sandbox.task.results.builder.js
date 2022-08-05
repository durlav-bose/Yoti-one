'use strict';

const { Validation } = require('../../util');
const SandboxDocumentTextDataExtractionTask = require('./task/sandbox.document.text.data.extraction.task');
const SandboxTaskResults = require('./sandbox.task.results');
const SandboxSupplementaryDocTextDataExtractionTask = require('./task/sandbox.supplementary.doc.text.data.extraction.task');

class SandboxTaskResultsBuilder {
  constructor() {
    this.documentTextDataExtractionTasks = [];
    this.supplementaryDocTextExtractionTasks = [];
  }

  /**
   * @param {DocumentTextDataExtractionTask} documentTextDataExtractionTask
   *
   * @returns {this}
   */
  withDocumentTextDataExtractionTask(documentTextDataExtractionTask) {
    Validation.instanceOf(
      documentTextDataExtractionTask,
      SandboxDocumentTextDataExtractionTask,
      'documentTextDataExtractionTask'
    );
    this.documentTextDataExtractionTasks.push(documentTextDataExtractionTask);
    return this;
  }

  /**
   * @param {SandboxSupplementaryDocTextDataExtractionTask} supplementaryDocTextExtractionTask
   */
  withSupplementaryDocTextDataExtractionTask(supplementaryDocTextExtractionTask) {
    Validation.instanceOf(
      supplementaryDocTextExtractionTask,
      SandboxSupplementaryDocTextDataExtractionTask,
      'supplementaryDocTextExtractionTask'
    );
    this.supplementaryDocTextExtractionTasks.push(supplementaryDocTextExtractionTask);
    return this;
  }

  /**
   * @returns {SandboxTaskResults}
   */
  build() {
    return new SandboxTaskResults(
      this.documentTextDataExtractionTasks,
      this.supplementaryDocTextExtractionTasks
    );
  }
}

module.exports = SandboxTaskResultsBuilder;
