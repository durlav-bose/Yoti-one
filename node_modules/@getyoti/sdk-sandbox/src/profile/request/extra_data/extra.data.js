'use strict';

const { Validation } = require('../../../util');
const SandboxDataEntry = require('./data.entry');

class SandboxExtraData {
  /**
   * @param {SandboxDataEntry[]} dataEntries
   */
  constructor(dataEntries) {
    Validation.isArrayOfType(dataEntries, SandboxDataEntry, 'dataEntries');
    this.dataEntries = dataEntries;
  }

  /**
   * @returns {Object}
   */
  toJSON() {
    return {
      data_entry: this.dataEntries,
    };
  }
}

module.exports = SandboxExtraData;
