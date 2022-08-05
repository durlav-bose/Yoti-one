'use strict';

const { Validation } = require('../../../../util');
const SandboxBreakdown = require('./sandbox.breakdown');
const SandboxDetail = require('./sandbox.detail');

class SandboxBreakdownBuilder {
  constructor() {
    this.details = [];
  }

  /**
   * @param {string} subCheck
   *
   * @returns {this}
   */
  withSubCheck(subCheck) {
    Validation.isString(subCheck, 'subCheck');
    this.subCheck = subCheck;
    return this;
  }

  /**
   * @param {string} result
   *
   * @returns {this}
   */
  withResult(result) {
    Validation.isString(result, 'result');
    this.result = result;
    return this;
  }

  /**
   * @param {string} key
   * @param {string} value
   *
   * @returns {this}
   */
  withDetail(key, value) {
    this.details.push(new SandboxDetail(key, value));
    return this;
  }

  /**
   * @returns {SandboxBreakdown}
   */
  build() {
    Validation.notNullOrEmpty(this.subCheck, 'subCheck');
    Validation.notNullOrEmpty(this.result, 'result');

    return new SandboxBreakdown(this.subCheck, this.result, this.details);
  }
}

module.exports = SandboxBreakdownBuilder;
