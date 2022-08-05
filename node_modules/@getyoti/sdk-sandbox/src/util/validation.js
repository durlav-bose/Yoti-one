'use strict';

const YotiValidation = require('yoti/src/yoti_common/validation');

class Validation extends YotiValidation {
  /**
   * Checks that provided date is a YotiDate
   *
   * @param {*} value
   * @param {string} name
   */
  static isYotiDate(value, name) {
    if (
      (value instanceof Date)
      && typeof value.getMicrosecondTimestamp === 'function'
    ) {
      return;
    }

    throw TypeError(`${name} must be instance of YotiDate`);
  }
}

module.exports = Validation;
