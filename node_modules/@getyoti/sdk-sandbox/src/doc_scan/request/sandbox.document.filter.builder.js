'use strict';

const { Validation } = require('../../util');
const SandboxDocumentFilter = require('./sandbox.document.filter');

class SandboxDocumentFilterBuilder {
  constructor() {
    this.documentTypes = [];
    this.countryCodes = [];
  }

  withDocumentType(documentType) {
    Validation.isString(documentType, 'documentType');
    this.documentTypes.push(documentType);
    return this;
  }

  withCountryCode(countryCode) {
    Validation.isString(countryCode, 'countryCode');
    this.countryCodes.push(countryCode);
    return this;
  }

  build() {
    return new SandboxDocumentFilter(this.documentTypes, this.countryCodes);
  }
}

module.exports = SandboxDocumentFilterBuilder;
