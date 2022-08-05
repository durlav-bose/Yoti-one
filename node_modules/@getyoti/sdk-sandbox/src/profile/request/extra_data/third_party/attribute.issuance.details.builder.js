'use strict';

const { Validation } = require('../../../../util');
const SandboxIssuingAttributes = require('./issuing.attributes');
const SandboxDefinition = require('./definition');
const SandboxAttributeIssuanceDetails = require('./attribute.issuance.details');
const SandboxAttributeIssuanceDetailsValue = require('./attribute.issuance.details.value');

class SandboxAttributeIssuanceDetailsBuilder {
  constructor() {
    this.definitions = [];
  }

  /**
   * @param {string} issuanceToken
   *
   * @returns {this}
   */
  withIssuanceToken(issuanceToken) {
    Validation.notNullOrEmpty(issuanceToken, 'issuanceToken');
    Validation.isString(issuanceToken, 'issuanceToken');
    this.issuanceToken = issuanceToken;
    return this;
  }

  /**
   * @param {Date} expiryDate
   *
   * @returns {this}
   */
  withExpiryDate(expiryDate) {
    Validation.instanceOf(expiryDate, Date, 'expiryDate');
    this.expiryDate = expiryDate;
    return this;
  }

  /**
   * @param {string} definition
   *
   * @returns {this}
   */
  withDefinition(definition) {
    Validation.notNullOrEmpty(definition, 'definition');
    Validation.isString(definition, 'definition');
    this.definitions.push(new SandboxDefinition(definition));
    return this;
  }

  /**
   * @returns {SandboxAttributeIssuanceDetails}
   */
  build() {
    const value = new SandboxAttributeIssuanceDetailsValue(
      this.issuanceToken,
      new SandboxIssuingAttributes(this.expiryDate, this.definitions)
    );
    return new SandboxAttributeIssuanceDetails(value);
  }
}

module.exports = SandboxAttributeIssuanceDetailsBuilder;
