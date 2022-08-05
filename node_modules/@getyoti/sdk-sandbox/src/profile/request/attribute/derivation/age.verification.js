'use strict';

const { constants } = require('yoti');
const SandboxAttributeBuilder = require('../attribute.builder');
const SandboxAnchor = require('../anchor');
const { Validation } = require('../../../../util');

/**
 * @class SandboxAgeVerification
 */
class SandboxAgeVerification {
  /**
   * @param {YotiDate} dateOfBirth
   * @param {string} supportedAgeDerivation
   * @param {SandboxAnchor[]} anchors
   */
  constructor(dateOfBirth, supportedAgeDerivation, anchors = null) {
    Validation.isYotiDate(dateOfBirth, 'dateOfBirth');
    this.dateOfBirth = dateOfBirth.toISODateString();

    Validation.notNull(supportedAgeDerivation, 'derivation');
    this.supportedAgeDerivation = supportedAgeDerivation;

    if (anchors !== null) {
      Validation.isArrayOfType(anchors, SandboxAnchor);
    }
    this.anchors = anchors;
  }

  /**
   * @returns {SandboxAttribute}
   */
  toAttribute() {
    return new SandboxAttributeBuilder()
      .withName(constants.ATTR_DATE_OF_BIRTH)
      .withValue(this.dateOfBirth)
      .withDerivation(this.supportedAgeDerivation)
      .withAnchors(this.anchors)
      .build();
  }
}

module.exports = SandboxAgeVerification;
