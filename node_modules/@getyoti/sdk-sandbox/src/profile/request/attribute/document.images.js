'use strict';

const Image = require('yoti/src/data_type/image');
const { Validation } = require('../../../util');

/**
 * @class SandboxDocumentImages
 */
class SandboxDocumentImages {
  /**
   * @param {Image[]} images
   */
  constructor(images) {
    Validation.isArrayOfType(images, Image, 'images');
    this.images = images;
  }

  /**
   * @returns {string}
   */
  getValue() {
    return this
      .images
      .map((image) => image.getBase64Content())
      .join('&');
  }
}

module.exports = SandboxDocumentImages;
