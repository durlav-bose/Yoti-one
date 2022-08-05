'use strict';

const { Validation } = require('../../../util');
const SandboxTextDataExtractionReason = require('./sandbox.text.data.extraction.reason');

const VALUE_QUALITY = 'QUALITY';
const VALUE_USER_ERROR = 'USER_ERROR';

class SandboxTextDataExtractionReasonBuilder {
  /**
   * @returns {this}
   */
  forQuality() {
    this.value = VALUE_QUALITY;
    return this;
  }

  /**
   * @returns {this}
   */
  forUserError() {
    this.value = VALUE_USER_ERROR;
    return this;
  }

  /**
   * @param {string} detail
   *
   * @returns {this}
   */
  withDetail(detail) {
    Validation.isString(detail, 'detail');
    this.detail = detail;
    return this;
  }

  /**
   * @returns {SandboxTextDataExtractionReason}
   */
  build() {
    return new SandboxTextDataExtractionReason(this.value, this.detail);
  }
}

module.exports = SandboxTextDataExtractionReasonBuilder;
