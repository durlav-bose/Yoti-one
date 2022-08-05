'use strict';

const { Validation } = require('../../util');
const SandboxDocumentTextDataCheck = require('./check/sandbox.document.text.data.check');
const SandboxLivenessCheck = require('./check/sandbox.liveness.check');
const SandboxDocumentFaceMatchCheck = require('./check/sandbox.document.face.match.check');
const SandboxDocumentAuthenticityCheck = require('./check/sandbox.document.authenticity.check');
const SandboxCheckReports = require('./sandbox.check.reports');
const SandboxIdDocumentComparisonCheck = require('./check/sandbox.id.document.comparison.check');
const SandboxSupplementaryDocTextDataCheck = require('./check/sandbox.supplementary.doc.text.data.check');
const SandboxThirdPartyIdentityCheck = require('./check/sandbox.third.party.identity.check');

class SandboxCheckReportsBuilder {
  constructor() {
    this.livenessChecks = [];
    this.documentTextDataChecks = [];
    this.documentAuthenticityChecks = [];
    this.documentFaceMatchChecks = [];
    this.idDocumentComparisonChecks = [];
    this.supplementaryDocTextDataChecks = [];
  }

  /**
   * @param {SandboxDocumentTextDataCheck} documentTextDataCheck
   *
   * @returns {this}
   */
  withDocumentTextDataCheck(documentTextDataCheck) {
    Validation.instanceOf(documentTextDataCheck, SandboxDocumentTextDataCheck, 'documentTextDataCheck');
    this.documentTextDataChecks.push(documentTextDataCheck);
    return this;
  }

  /**
   * @param {SandboxSupplementaryDocTextDataCheck} supplementaryDocTextDataChecks
   *
   * @returns {this}
   */
  withSupplementaryDocTextDataCheck(supplementaryDocTextDataChecks) {
    Validation.instanceOf(supplementaryDocTextDataChecks, SandboxSupplementaryDocTextDataCheck, 'supplementaryDocTextDataChecks');
    this.supplementaryDocTextDataChecks.push(supplementaryDocTextDataChecks);
    return this;
  }

  /**
   * @param {SandboxDocumentAuthenticityCheck} documentAuthenticityCheck
   *
   * @returns {this}
   */
  withDocumentAuthenticityCheck(documentAuthenticityCheck) {
    Validation.instanceOf(documentAuthenticityCheck, SandboxDocumentAuthenticityCheck, 'documentAuthenticityCheck');
    this.documentAuthenticityChecks.push(documentAuthenticityCheck);
    return this;
  }

  /**
   * @param {SandboxLivenessCheck} livenessCheck
   *
   * @returns {this}
   */
  withLivenessCheck(livenessCheck) {
    Validation.instanceOf(livenessCheck, SandboxLivenessCheck, 'livenessCheck');
    this.livenessChecks.push(livenessCheck);
    return this;
  }

  /**
   * @param {SandboxDocumentFaceMatchCheck} documentFaceMatchCheck
   *
   * @returns {this}
   */
  withDocumentFaceMatchCheck(documentFaceMatchCheck) {
    Validation.instanceOf(documentFaceMatchCheck, SandboxDocumentFaceMatchCheck, 'documentFaceMatchCheck');
    this.documentFaceMatchChecks.push(documentFaceMatchCheck);
    return this;
  }

  /**
   * @param {SandboxIdDocumentComparisonCheck} idDocumentComparisonCheck
   *
   * @returns {this}
   */
  withIdDocumentComparisonCheck(idDocumentComparisonCheck) {
    Validation.instanceOf(idDocumentComparisonCheck, SandboxIdDocumentComparisonCheck, 'idDocumentComparisonCheck');
    this.idDocumentComparisonChecks.push(idDocumentComparisonCheck);
    return this;
  }

  /**
 * @param {SandboxThirdPartyIdentityCheck} thirdPartyIdentityCheck
 *
 * @returns {this}
 */
  withThirdPartyIdentityCheck(thirdPartyIdentityCheck) {
    Validation.instanceOf(thirdPartyIdentityCheck, SandboxThirdPartyIdentityCheck, 'thirdPartyIdentityCheck');
    this.thirdPartyIdentityCheck = thirdPartyIdentityCheck;
    return this;
  }

  /**
   * @param {int} asyncReportDelay
   *
   * @returns {this}
   */
  withAsyncReportDelay(asyncReportDelay) {
    Validation.isInteger(asyncReportDelay, 'asyncReportsDelay');
    this.asyncReportDelay = asyncReportDelay;
    return this;
  }

  /**
   * @returns {SandboxCheckReports}
   */
  build() {
    return new SandboxCheckReports(
      this.documentTextDataChecks,
      this.documentAuthenticityChecks,
      this.livenessChecks,
      this.documentFaceMatchChecks,
      this.asyncReportDelay,
      this.idDocumentComparisonChecks,
      this.supplementaryDocTextDataChecks,
      this.thirdPartyIdentityCheck
    );
  }
}

module.exports = SandboxCheckReportsBuilder;
