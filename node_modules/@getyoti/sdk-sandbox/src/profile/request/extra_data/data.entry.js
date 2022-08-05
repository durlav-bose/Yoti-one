'use strict';

const { Validation } = require('../../../util');

class SandboxDataEntry {
  /**
   * @param {string} type
   * @param {*} value
   */
  constructor(type, value) {
    if (new.target === SandboxDataEntry) {
      throw TypeError('SandboxDataEntry cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;

    Validation.notNullOrEmpty(value, 'value');
    this.value = value;
  }

  /**
   * @return {Object}
   */
  toJSON() {
    return {
      type: this.type,
      value: this.value,
    };
  }
}

module.exports = SandboxDataEntry;
