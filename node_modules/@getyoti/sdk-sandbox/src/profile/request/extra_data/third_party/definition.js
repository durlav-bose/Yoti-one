'use strict';

const { Validation } = require('../../../../util');

class SandboxDefinition {
  /**
   * @param {string} name
   */
  constructor(name) {
    Validation.notNullOrEmpty(name, 'name');
    Validation.isString(name, 'name');
    this.name = name;
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
    };
  }
}

module.exports = SandboxDefinition;
