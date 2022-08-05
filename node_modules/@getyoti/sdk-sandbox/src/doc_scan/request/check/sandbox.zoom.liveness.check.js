'use strict';

const { DocScanConstants } = require('yoti');
const SandboxLivenessCheck = require('./sandbox.liveness.check');

class SandboxZoomLivenessCheck extends SandboxLivenessCheck {
  /**
   * @param {SandboxCheckResult} result
   */
  constructor(result) {
    super(result, DocScanConstants.ZOOM);
  }
}

module.exports = SandboxZoomLivenessCheck;
