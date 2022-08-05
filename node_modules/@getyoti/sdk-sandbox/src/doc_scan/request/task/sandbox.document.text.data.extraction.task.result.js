'use strict';

const { Validation } = require('../../../util');
const SandboxDocumentIdPhoto = require('./sandbox.document.id.photo');
const SandboxTextDataExtractionRecommendation = require('./sandbox.text.data.extraction.recommendation');

class SandboxDocumentTextDataExtractionTaskResult {
  /**
   * @param {Object.<string,*>} documentFields
   * @param {SandboxDocumentIdPhoto} documentIdPhoto
   * @param {string} detectedCountry
   * @param {SandboxTextDataExtractionRecommendation} recommendation
   */
  constructor(
    documentFields,
    documentIdPhoto,
    detectedCountry,
    recommendation
  ) {
    this.documentFields = documentFields;

    if (documentIdPhoto) {
      Validation.instanceOf(documentIdPhoto, SandboxDocumentIdPhoto, 'documentIdPhoto');
      this.documentIdPhoto = documentIdPhoto;
    }

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
      document_id_photo: this.documentIdPhoto,
      detected_country: this.detectedCountry,
      recommendation: this.recommendation,
    };
  }
}

module.exports = SandboxDocumentTextDataExtractionTaskResult;
