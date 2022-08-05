'use strict';

const { Validation } = require('../../../../util');

class SandboxDetail {
  /**
   * @param {string} name
   * @param {string} value
   */
  constructor(name, value) {
    Validation.isString(name, 'name');
    this.name = name;

    Validation.isString(value, 'value');
    this.value = value;
  }

  toJSON() {
    return {
      name: this.name,
      value: this.value,
    };
  }
}

module.exports = SandboxDetail;
