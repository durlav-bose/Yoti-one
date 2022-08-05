'use strict';

const { Validation } = require('../../../util');
const SandboxTextDataExtractionReason = require('./sandbox.text.data.extraction.reason');

class SandboxTextDataExtractionRecommendation {
  /**
   * @param {string} value
   * @param {string} reason
   */
  constructor(value, reason) {
    Validation.isString(value, 'value');
    this.value = value;

    if (reason) {
      Validation.instanceOf(reason, SandboxTextDataExtractionReason, 'reason');
      this.reason = reason;
    }
  }

  toJSON() {
    return {
      value: this.value,
      reason: this.reason,
    };
  }
}

module.exports = SandboxTextDataExtractionRecommendation;
