'use strict';

const { Validation } = require('../../util');
const SandboxAttribute = require('./attribute/attribute');
const SandboxExtraData = require('./extra_data/extra.data');

/**
 * @class TokenRequest
 */
class TokenRequest {
  /**
   * @param {string} rememberMeId
   * @param {SandboxAttribute[]} sandboxAttributes
   * @param {SandboxExtraData} extraData
   */
  constructor(rememberMeId, sandboxAttributes, extraData) {
    Validation.isString(rememberMeId, 'rememberMeId', true);
    this.rememberMeId = rememberMeId;

    Validation.isArrayOfType(sandboxAttributes, SandboxAttribute, 'sandboxAttributes');
    this.sandboxAttributes = sandboxAttributes;

    if (extraData) {
      Validation.instanceOf(extraData, SandboxExtraData, 'extraData');
      this.extraData = extraData;
    }
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      remember_me_id: this.rememberMeId,
      profile_attributes: this.sandboxAttributes,
      extra_data: this.extraData,
    };
  }
}

module.exports = TokenRequest;
