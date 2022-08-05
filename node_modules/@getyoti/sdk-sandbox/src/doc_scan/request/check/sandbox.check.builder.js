'use strict';

const { Validation } = require('../../../util');
const SandboxRecommendation = require('./report/sandbox.recommendation');
const SandboxBreakdown = require('./report/sandbox.breakdown');

/**
 * Base check builder.
 */
class SandboxCheckBuilder {
  constructor() {
    if (new.target === SandboxCheckBuilder) {
      throw TypeError('SandboxCheckBuilder cannot be instantiated');
    }

    this.breakdown = [];
  }

  /**
   * @param {SandboxRecommendation} recommendation
   *
   * @returns {this}
   */
  withRecommendation(recommendation) {
    Validation.instanceOf(recommendation, SandboxRecommendation, 'recommendation');
    this.recommendation = recommendation;
    return this;
  }

  /**
   * @param {SandboxBreakdown} breakdown
   *
   * @returns {this}
   */
  withBreakdown(breakdown) {
    Validation.instanceOf(breakdown, SandboxBreakdown, 'breakdown');
    this.breakdown.push(breakdown);
    return this;
  }

  /**
   * @param {SandboxBreakdown[]} breakdowns
   *
   * @returns {this}
   */
  withBreakdowns(breakdowns) {
    Validation.isArrayOfType(breakdowns, SandboxBreakdown, 'breakdowns');
    this.breakdown = breakdowns;
    return this;
  }
}

module.exports = SandboxCheckBuilder;
