'use strict';

const { Validation } = require('../../../util');

class SandboxTextDataExtractionReason {
  /**
   * @param {string} value
   * @param {string} detail
   */
  constructor(value, detail) {
    Validation.isString(value, 'value');
    this.value = value;

    Validation.isString(detail, 'detail', true);
    this.detail = detail;
  }

  toJSON() {
    return {
      value: this.value,
      detail: this.detail,
    };
  }
}

module.exports = SandboxTextDataExtractionReason;
