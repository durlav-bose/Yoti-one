'use strict';

const { Validation } = require('../util');
const SandboxDocScanClient = require('./sandbox.doc.scan.client');

/**
 * @class SandboxDocScanClientBuilder
 */
class SandboxDocScanClientBuilder {
  /**
   * @param {string} sdkId
   */
  withClientSdkId(sdkId) {
    Validation.isString(sdkId, 'sdkId');
    this.sdkId = sdkId;
    return this;
  }

  /**
   * @param {string|Buffer} pemString
   *
   * @returns {this}
   */
  withPemString(pem) {
    Validation.notNullOrEmpty(pem, 'pem');
    this.pem = pem;
    return this;
  }

  /**
   * @param {string} sandboxUrl
   *
   * @returns {this}
   */
  withSandboxUrl(sandboxUrl) {
    Validation.isString(sandboxUrl, 'sandboxUrl');
    this.sandboxUrl = sandboxUrl;
    return this;
  }

  /**
   * @returns {SandboxDocScanClient}
   */
  build() {
    return new SandboxDocScanClient(this.sdkId, this.pem, this.sandboxUrl);
  }
}

module.exports = SandboxDocScanClientBuilder;
