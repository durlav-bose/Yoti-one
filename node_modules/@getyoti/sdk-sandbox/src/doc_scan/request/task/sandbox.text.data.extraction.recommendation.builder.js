'use strict';

const { Validation } = require('../../../util');
const SandboxTextDataExtractionReason = require('./sandbox.text.data.extraction.reason');
const SandboxTextDataExtractionRecommendation = require('./sandbox.text.data.extraction.recommendation');

const VALUE_PROGRESS = 'PROGRESS';
const VALUE_SHOULD_TRY_AGAIN = 'SHOULD_TRY_AGAIN';
const VALUE_MUST_TRY_AGAIN = 'MUST_TRY_AGAIN';

class SandboxTextDataExtractionRecommendationBuilder {
  /**
   * @returns {this}
   */
  forProgress() {
    this.value = VALUE_PROGRESS;
    return this;
  }

  /**
   * @returns {this}
   */
  forShouldTryAgain() {
    this.value = VALUE_SHOULD_TRY_AGAIN;
    return this;
  }

  /**
   * @returns {this}
   */
  forMustTryAgain() {
    this.value = VALUE_MUST_TRY_AGAIN;
    return this;
  }

  /**
   * @param {SandboxTextDataExtractionReason} reason
   *
   * @returns {this}
   */
  withReason(reason) {
    Validation.instanceOf(reason, SandboxTextDataExtractionReason, 'reason');
    this.reason = reason;
    return this;
  }

  /**
   * @returns {SandboxTextDataExtractionReason}
   */
  build() {
    return new SandboxTextDataExtractionRecommendation(this.value, this.reason);
  }
}

module.exports = SandboxTextDataExtractionRecommendationBuilder;
