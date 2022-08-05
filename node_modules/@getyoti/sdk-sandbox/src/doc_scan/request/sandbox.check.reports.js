'use strict';

const { Validation } = require('../../util');
const SandboxDocumentTextDataCheck = require('./check/sandbox.document.text.data.check');
const SandboxDocumentFaceMatchCheck = require('./check/sandbox.document.face.match.check');
const SandboxDocumentAuthenticityCheck = require('./check/sandbox.document.authenticity.check');
const SandboxLivenessCheck = require('./check/sandbox.liveness.check');
const SandboxIdDocumentComparisonCheck = require('./check/sandbox.id.document.comparison.check');
const SandboxSupplementaryDocTextDataCheck = require('./check/sandbox.supplementary.doc.text.data.check');
const SandboxThirdPartyIdentityCheck = require('./check/sandbox.third.party.identity.check');

class SandboxCheckReports {
  /**
   * @param {SandboxTextDataCheck[]} documentTextDataChecks
   * @param {SandboxDocumentAuthenticityCheck[]} documentAuthenticityChecks
   * @param {SandboxLivenessCheck[]} livenessChecks
   * @param {SandboxDocumentFaceMatchCheck[]} documentFaceMatchChecks
   * @param {int} asyncReportDelay
   * @param {SandboxIdDocumentComparisonCheck[]} idDocumentComparisonChecks
   * @param {SandboxSupplementaryDocTextDataCheck[]} supplementaryDocTextDataChecks
   * @param {SandboxThirdPartyIdentityCheck} thirdPartyIdentityCheck
   */
  constructor(
    documentTextDataChecks,
    documentAuthenticityChecks,
    livenessChecks,
    documentFaceMatchChecks,
    asyncReportDelay,
    idDocumentComparisonCheck,
    supplementaryDocTextDataChecks,
    thirdPartyIdentityCheck
  ) {
    Validation.isArrayOfType(documentTextDataChecks, SandboxDocumentTextDataCheck, 'documentTextDataCheck');
    this.documentTextDataChecks = documentTextDataChecks;

    Validation.isArrayOfType(documentAuthenticityChecks, SandboxDocumentAuthenticityCheck, 'documentAuthenticityCheck');
    this.documentAuthenticityChecks = documentAuthenticityChecks;

    Validation.isArrayOfType(livenessChecks, SandboxLivenessCheck, 'livenessCheck');
    this.livenessChecks = livenessChecks;

    Validation.isArrayOfType(documentFaceMatchChecks, SandboxDocumentFaceMatchCheck, 'documentFaceMatchCheck');
    this.documentFaceMatchChecks = documentFaceMatchChecks;

    Validation.isInteger(asyncReportDelay, 'asyncReportDelay', true);
    this.asyncReportDelay = asyncReportDelay;

    if (idDocumentComparisonCheck) {
      Validation.isArrayOfType(idDocumentComparisonCheck, SandboxIdDocumentComparisonCheck, 'idDocumentComparisonCheck');
      this.idDocumentComparisonCheck = idDocumentComparisonCheck;
    }

    if (supplementaryDocTextDataChecks) {
      Validation.isArrayOfType(supplementaryDocTextDataChecks, SandboxSupplementaryDocTextDataCheck, 'supplementaryDocTextDataChecks');
      this.supplementaryDocTextDataChecks = supplementaryDocTextDataChecks;
    }

    if (thirdPartyIdentityCheck) {
      Validation.instanceOf(thirdPartyIdentityCheck, SandboxThirdPartyIdentityCheck, 'thirdPartyIdentityCheck');
      this.thirdPartyIdentityCheck = thirdPartyIdentityCheck;
    }
  }

  toJSON() {
    return {
      ID_DOCUMENT_TEXT_DATA_CHECK: this.documentTextDataChecks,
      ID_DOCUMENT_AUTHENTICITY: this.documentAuthenticityChecks,
      ID_DOCUMENT_FACE_MATCH: this.documentFaceMatchChecks,
      LIVENESS: this.livenessChecks,
      ID_DOCUMENT_COMPARISON: this.idDocumentComparisonCheck,
      SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: this.supplementaryDocTextDataChecks,
      THIRD_PARTY_IDENTITY: this.thirdPartyIdentityCheck,
      async_report_delay: this.asyncReportDelay,
    };
  }
}

module.exports = SandboxCheckReports;
