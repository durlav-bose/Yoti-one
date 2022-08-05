'use strict';

const { Validation } = require('../../../util');
const SandboxCheck = require('./sandbox.check');

class SandboxLivenessCheck extends SandboxCheck {
  /**
   * @param {SandboxCheckResult} result
   * @param {string} livenessType
   */
  constructor(result, livenessType) {
    if (new.target === SandboxLivenessCheck) {
      throw TypeError('SandboxLivenessCheck cannot be instantiated');
    }

    super(result);

    Validation.isString(livenessType, 'livenessType');
    this.livenessType = livenessType;
  }

  toJSON() {
    const json = super.toJSON();
    json.liveness_type = this.livenessType;
    return json;
  }
}

module.exports = SandboxLivenessCheck;
