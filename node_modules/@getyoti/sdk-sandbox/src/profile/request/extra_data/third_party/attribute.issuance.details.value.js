'use strict';

const { Validation } = require('../../../../util');
const SandboxIssuingAttributes = require('./issuing.attributes');

class SandboxAttributeIssuanceDetailsValue {
  /**
   * @param {string} issuanceToken
   * @param {SandboxIssuingAttributes} issuingAttributes
   */
  constructor(issuanceToken, issuingAttributes) {
    Validation.isString(issuanceToken, 'issuanceToken');
    this.issuanceToken = issuanceToken;

    Validation.instanceOf(issuingAttributes, SandboxIssuingAttributes, 'issuingAttributes');
    this.issuingAttributes = issuingAttributes;
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return {
      issuance_token: this.issuanceToken,
      issuing_attributes: this.issuingAttributes,
    };
  }
}

module.exports = SandboxAttributeIssuanceDetailsValue;
