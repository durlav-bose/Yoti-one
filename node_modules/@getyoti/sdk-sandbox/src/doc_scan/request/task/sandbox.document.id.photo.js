'use strict';

const { Validation } = require('../../../util');

class SandboxDocumentIdPhoto {
  /**
   * @param {string} contentType
   * @param {Buffer} data
   */
  constructor(contentType, data) {
    Validation.isString(contentType, 'contentType');
    this.contentType = contentType;

    Validation.instanceOf(data, Buffer, 'data');
    this.data = data;
  }

  toJSON() {
    return {
      content_type: this.contentType,
      data: this.data.toString('base64'),
    };
  }
}

module.exports = SandboxDocumentIdPhoto;
