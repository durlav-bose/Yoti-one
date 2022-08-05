'use strict';

const { Validation } = require('../../../../util');
const SandboxDefinition = require('./definition');

class SandboxIssuingAttributes {
  /**
   * @param {Date} expiryDate
   * @param {SandboxDefinition[]} definitions
   */
  constructor(expiryDate, definitions) {
    Validation.instanceOf(expiryDate, Date, 'expiryDate');
    this.expiryDate = expiryDate;

    Validation.isArrayOfType(definitions, SandboxDefinition, 'definitions');
    this.definitions = definitions;
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return {
      expiry_date: this.expiryDate.toISOString(),
      definitions: this.definitions,
    };
  }
}

module.exports = SandboxIssuingAttributes;
