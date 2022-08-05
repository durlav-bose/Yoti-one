'use strict';

const { Validation } = require('../../../util');
const SandboxCheckBuilder = require('./sandbox.check.builder');
const SandboxDocumentFilter = require('../sandbox.document.filter');

/**
 * Base document check builder.
 */
class SandboxDocumentCheckBuilder extends SandboxCheckBuilder {
  constructor() {
    if (new.target === SandboxDocumentCheckBuilder) {
      throw TypeError('SandboxDocumentCheckBuilder cannot be instantiated');
    }
    super();
  }

  /**
   * @param {SandboxDocumentFilter} documentFilter
   *
   * @returns {this}
   */
  withDocumentFilter(documentFilter) {
    Validation.instanceOf(documentFilter, SandboxDocumentFilter, 'documentFilter');
    this.documentFilter = documentFilter;
    return this;
  }
}

module.exports = SandboxDocumentCheckBuilder;
