'use strict';

const { Validation } = require('../../../../util');
const SandboxDataEntry = require('../data.entry');
const SandboxAttributeIssuanceDetailsValue = require('./attribute.issuance.details.value');

class SandboxAttributeIssuanceDetails extends SandboxDataEntry {
  /**
   * @param {SandboxAttributeIssuanceDetailsValue} value
   */
  constructor(value) {
    Validation.instanceOf(value, SandboxAttributeIssuanceDetailsValue, 'value');
    super('THIRD_PARTY_ATTRIBUTE', value);
  }
}

module.exports = SandboxAttributeIssuanceDetails;
