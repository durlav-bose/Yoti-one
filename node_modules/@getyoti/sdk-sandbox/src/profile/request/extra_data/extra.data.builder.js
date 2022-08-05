'use strict';

const { Validation } = require('../../../util');
const SandboxDataEntry = require('./data.entry');
const SandboxExtraData = require('./extra.data');

class SandboxExtraDataBuilder {
  constructor() {
    this.dataEntries = [];
  }

  /**
   * @param {SandboxDataEntry} dataEntry
   *
   * @returns {this}
   */
  withDataEntry(dataEntry) {
    Validation.instanceOf(dataEntry, SandboxDataEntry, 'dataEntry');
    this.dataEntries.push(dataEntry);
    return this;
  }

  /**
   * @returns {SandboxExtraData}
   */
  build() {
    return new SandboxExtraData(this.dataEntries);
  }
}

module.exports = SandboxExtraDataBuilder;
