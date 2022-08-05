'use strict';

const { YotiDate, constants } = require('yoti');
const { Validation } = require('../../util');
const TokenRequest = require('./token');
const SandboxAttributeBuilder = require('./attribute/attribute.builder');
const SandboxAgeVerification = require('./attribute/derivation/age.verification');
const SandboxExtraData = require('./extra_data/extra.data');
const SandboxDocumentImages = require('./attribute/document.images');

/**
 * @param {string} name
 * @param {string} value
 * @param {SandboxAnchor[]} anchors
 */
const createAttribute = (
  name,
  value,
  anchors
) => new SandboxAttributeBuilder()
  .withName(name)
  .withValue(value)
  .withAnchors(anchors)
  .build();

/**
 * @class TokenRequestBuilder
 */
class TokenRequestBuilder {
  /**
   * Set initial property values.
   */
  constructor() {
    this.attributes = {};
  }

  /**
   * @param {string} value
   *
   * @returns {this}
   */
  withRememberMeId(value) {
    this.rememberMeId = value;
    return this;
  }

  /**
   * @param {SandboxAttribute} value
   *
   * @returns {this}
   */
  withAttribute(sandboxAttribute) {
    const key = sandboxAttribute.getDerivation() != null
      ? sandboxAttribute.getDerivation()
      : sandboxAttribute.getName();
    this.attributes[key] = sandboxAttribute;
    return this;
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withGivenNames(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_GIVEN_NAMES, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withFamilyName(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_FAMILY_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withFullName(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_FULL_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {YotiDate} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withDateOfBirth(value, anchors = null) {
    Validation.isYotiDate(value, 'value');
    const sandboxAttribute = createAttribute(
      constants.ATTR_DATE_OF_BIRTH,
      value.toISODateString(),
      anchors
    );
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withDateOfBirthString(value, anchors = null) {
    Validation.isString(value, 'value');
    return this.withDateOfBirth(
      YotiDate.fromDateString(value),
      anchors
    );
  }

  /**
   * @param {SandboxAgeVerification} sandboxAgeVerification
   *
   * @returns {this}
   */
  withAgeVerification(sandboxAgeVerification) {
    Validation.instanceOf(sandboxAgeVerification, SandboxAgeVerification, 'sandboxAgeVerification');
    return this.withAttribute(sandboxAgeVerification.toAttribute());
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withGender(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_GENDER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withPhoneNumber(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_PHONE_NUMBER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withNationality(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_NATIONALITY, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withPostalAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_POSTAL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withStructuredPostalAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(
      constants.ATTR_STRUCTURED_POSTAL_ADDRESS,
      value,
      anchors
    );
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withSelfie(value, anchors = null) {
    return this.withBase64Selfie(Buffer.from(value).toString('base64'), anchors);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withBase64Selfie(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_SELFIE, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withEmailAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_EMAIL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withDocumentDetails(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_DOCUMENT_DETAILS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {SandboxDocumentImages} documentImages
   * @param {SandboxAnchor[]}
   *
   * @returns {this}
   */
  withDocumentImages(documentImages, anchors = null) {
    Validation.instanceOf(documentImages, SandboxDocumentImages, 'documentImages');
    const sandboxAttribute = createAttribute(
      constants.ATTR_DOCUMENT_IMAGES,
      documentImages.getValue(),
      anchors
    );
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {SandboxExtraData} extraData
   *
   * @returns {this}
   */
  withExtraData(extraData) {
    Validation.instanceOf(extraData, SandboxExtraData, 'extraData');
    this.extraData = extraData;
    return this;
  }

  /**
   * @returns {TokenRequest}
   */
  build() {
    return new TokenRequest(
      this.rememberMeId,
      Object.keys(this.attributes).map((k) => this.attributes[k]),
      this.extraData
    );
  }
}

module.exports = TokenRequestBuilder;
