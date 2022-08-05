'use strict';

const { Validation } = require('../../../util');
const SandboxRecommendation = require('./report/sandbox.recommendation');
const SandboxBreakdown = require('./report/sandbox.breakdown');

class SandboxCheckReport {
  /**
   * @param {SandboxRecommendation} recommendation
   * @param {SandboxBreakdown} breakdown
   */
  constructor(recommendation, breakdown) {
    Validation.instanceOf(recommendation, SandboxRecommendation, 'recommendation');
    this.recommendation = recommendation;

    Validation.isArrayOfType(breakdown, SandboxBreakdown, 'breakdown');
    this.breakdown = breakdown;
  }

  toJSON() {
    return {
      recommendation: this.recommendation,
      breakdown: this.breakdown,
    };
  }
}

module.exports = SandboxCheckReport;
