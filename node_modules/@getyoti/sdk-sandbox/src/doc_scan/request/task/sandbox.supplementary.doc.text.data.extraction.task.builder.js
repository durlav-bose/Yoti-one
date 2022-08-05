'use strict';

const { Validation } = require('../../../util');
const SandboxDocumentFilter = require('../sandbox.document.filter');
const SandboxTextDataExtractionRecommendation = require('./sandbox.text.data.extraction.recommendation');
const SandboxSupplementaryDocTextDataExtractionTask = require('./sandbox.supplementary.doc.text.data.extraction.task');
const SandboxSupplementaryDocTextDataExtractionTaskResult = require('./sandbox.supplementary.doc.text.data.extraction.task.result');

class SandboxSupplementaryDocTextDataExtractionTaskBuilder {
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
    this.documentFields = documentFields;
    return this;
  }

  /**
   * @param {SandboxDocumentFilter} documentFilter
   *
   * @returns {this}
   */
  withDocumentFilter(documentFilter) {
    Validation.instanceOf(documentFilter, SandboxDocumentFilter, 'documentFilter');
    this.documentFilter = documentFilter;
    return this;
  }

  /**
   * @param {SandboxTextDataExtractionRecommendation} recommendation
   *
   * @return {this}
   */
  withRecommendation(recommendation) {
    Validation.instanceOf(recommendation, SandboxTextDataExtractionRecommendation, 'recommendation');
    this.recommendation = recommendation;
    return this;
  }

  /**
   * @param detectedCountry
   *
   * @return {this}
   */
  withDetectedCountry(detectedCountry) {
    Validation.isString(detectedCountry, 'detectedCountry');
    this.detectedCountry = detectedCountry;
    return this;
  }

  /**
   * @returns {SandboxSupplementaryDocTextDataExtractionTask}
   */
  build() {
    const result = new SandboxSupplementaryDocTextDataExtractionTaskResult(
      this.documentFields,
      this.detectedCountry,
      this.recommendation
    );
    return new SandboxSupplementaryDocTextDataExtractionTask(result, this.documentFilter);
  }
}

module.exports = SandboxSupplementaryDocTextDataExtractionTaskBuilder;
