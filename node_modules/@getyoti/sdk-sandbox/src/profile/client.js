'use strict';

const {
  RequestBuilder,
  Payload,
  constants,
} = require('yoti');
const TokenResponse = require('./response/token');
const { Validation } = require('../util');

/**
 * Default Sandbox API URL.
 */
const SANDBOX_API_URL = `${constants.API_BASE_URL}/sandbox/v1`;

/**
 * @class SandboxProfileClient
 */
class SandboxProfileClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {string} sandboxUrl
   */
  constructor(sdkId, pem, sandboxUrl) {
    Validation.isString(sdkId, 'sdkId');
    this.sdkId = sdkId;
    this.endpoint = `/apps/${sdkId}/tokens`;

    Validation.notNullOrEmpty(pem, 'pem');
    this.pem = pem;

    if (sandboxUrl) {
      Validation.isString(sandboxUrl, 'sandboxUrl');
      this.sandboxUrl = sandboxUrl;
    } else {
      this.sandboxUrl = SANDBOX_API_URL;
    }
  }

  /**
   * @param {TokenRequest} tokenRequest
   *
   * @returns {Promise}
   */
  setupSharingProfile(tokenRequest) {
    const request = (new RequestBuilder())
      .withBaseUrl(this.sandboxUrl)
      .withEndpoint(this.endpoint)
      .withPemString(this.pem)
      .withPayload(new Payload(tokenRequest))
      .withPost()
      .build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            return resolve(new TokenResponse(response.getParsedResponse()));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }
}

module.exports = SandboxProfileClient;
