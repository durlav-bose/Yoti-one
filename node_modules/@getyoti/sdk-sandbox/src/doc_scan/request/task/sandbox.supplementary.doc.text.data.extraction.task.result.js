'use strict';

const { Validation } = require('../../../util');
const SandboxTextDataExtractionRecommendation = require('./sandbox.text.data.extraction.recommendation');

class SandboxSupplementaryDocTextDataExtractionTaskResult {
  /**
   * @param {Object.<string,*>} documentFields
   * @param {string} detectedCountry
   * @param {SandboxTextDataExtractionRecommendation} recommendation
   */
  constructor(
    documentFields,
    detectedCountry,
    recommendation
  ) {
    this.documentFields = documentFields;

    Validation.isString(detectedCountry, 'detectedCountry', true);
    this.detectedCountry = detectedCountry;

    if (recommendation) {
      Validation.instanceOf(recommendation, SandboxTextDataExtractionRecommendation, 'recommendation');
      this.recommendation = recommendation;
    }
  }

  toJSON() {
    return {
      document_fields: this.documentFields,
      detected_country: this.detectedCountry,
      recommendation: this.recommendation,
    };
  }
}

module.exports = SandboxSupplementaryDocTextDataExtractionTaskResult;
