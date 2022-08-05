'use strict';

const ImageJpeg = require('yoti/src/data_type/image.jpeg');
const ImagePng = require('yoti/src/data_type/image.png');
const SandboxDocumentImages = require('./document.images');

/**
 * @class SandboxDocumentImagesBuilder
 */
class SandboxDocumentImagesBuilder {
  constructor() {
    this.images = [];
  }

  /**
   * @param {Buffer} content
   *
   * @returns {SandboxDocumentImagesBuilder}
   */
  withJpegContent(content) {
    this.images.push(new ImageJpeg(content));
    return this;
  }

  /**
   * @param {Buffer} content
   *
   * @returns {SandboxDocumentImagesBuilder}
   */
  withPngContent(content) {
    this.images.push(new ImagePng(content));
    return this;
  }

  /**
   * @returns {SandboxDocumentImages}
   */
  build() {
    return new SandboxDocumentImages(this.images);
  }
}

module.exports = SandboxDocumentImagesBuilder;
