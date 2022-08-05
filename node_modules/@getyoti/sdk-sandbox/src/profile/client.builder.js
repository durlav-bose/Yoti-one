'use strict';

const fs = require('fs');
const SandboxProfileClient = require('./client');
const { Validation } = require('../util');

/**
 * @class SandboxProfileClientBuilder
 */
class SandboxProfileClientBuilder {
  /**
   * @param {string} sdkId
   */
  withClientSdkId(sdkId) {
    this.sdkId = sdkId;
    return this;
  }

  /**
   * @param {string|Buffer} pemString
   *
   * @returns {SandboxProfileClientBuilder}
   */
  withPemString(pem) {
    Validation.notNullOrEmpty(pem, 'pem');
    this.pem = pem;
    return this;
  }

  /**
   * @param {string} filePath
   *
   * @returns {SandboxProfileClientBuilder}
   */
  withPemFilePath(filePath) {
    Validation.isString(filePath, 'filePath');
    return this.withPemString(fs.readFileSync(filePath, 'utf8'));
  }

  /**
   * @param {string} sandboxUrl
   *
   * @returns {SandboxProfileClientBuilder}
   */
  withSandboxUrl(sandboxUrl) {
    this.sandboxUrl = sandboxUrl;
    return this;
  }

  /**
   * @returns {SandboxProfileClient}
   */
  build() {
    return new SandboxProfileClient(this.sdkId, this.pem, this.sandboxUrl);
  }
}

module.exports = SandboxProfileClientBuilder;
