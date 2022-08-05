'use strict';

const { Validation } = require('../../../../util');
const SandboxDetail = require('./sandbox.detail');

class SandboxBreakdown {
  /**
   * @param {string} subCheck
   * @param {string} result
   * @param {SandboxDetail[]} details
   */
  constructor(subCheck, result, details) {
    Validation.isString(subCheck, 'sub_check');
    this.subCheck = subCheck;

    Validation.isString(result, 'result');
    this.result = result;

    Validation.isArrayOfType(details, SandboxDetail, 'details');
    this.details = details;
  }

  toJSON() {
    return {
      sub_check: this.subCheck,
      result: this.result,
      details: this.details,
    };
  }
}

module.exports = SandboxBreakdown;
