const {
  SandboxCheckReportsBuilder,
  SandboxDocumentTextDataCheckBuilder,
  SandboxRecommendationBuilder,
  SandboxDocumentAuthenticityCheckBuilder,
  SandboxZoomLivenessCheckBuilder,
  SandboxDocumentFaceMatchCheckBuilder,
  SandboxSupplementaryDocTextDataCheckBuilder,
  SandboxIdDocumentComparisonCheckBuilder,
  SandboxThirdPartyIdentityCheckBuilder,
} = require('../../..');
const SandboxCheckReports = require('../../../src/doc_scan/request/sandbox.check.reports');

const SOME_VALUE = 'some-value';
const SOME_RECOMMENDATION = new SandboxRecommendationBuilder()
  .withValue(SOME_VALUE)
  .build();

describe('SandboxCheckReportsBuilder', () => {
  describe('#build', () => {
    it('builds a SandboxCheckReports', () => {
      const checkReport = new SandboxCheckReportsBuilder().build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withDocumentTextDataCheck', () => {
    it('builds a SandboxCheckReport with text data check', () => {
      const SOME_DOCUMENT_TEXT_DATA_CHECK = new SandboxDocumentTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withDocumentTextDataCheck(SOME_DOCUMENT_TEXT_DATA_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [SOME_DOCUMENT_TEXT_DATA_CHECK],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withDocumentAuthenticityCheck', () => {
    it('builds a SandboxCheckReport with authenticity check', () => {
      const SOME_AUTHENTICITY_CHECK = new SandboxDocumentAuthenticityCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withDocumentAuthenticityCheck(SOME_AUTHENTICITY_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [SOME_AUTHENTICITY_CHECK],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withIdDocumentComparisonCheck', () => {
    it('builds a SandboxCheckReport with ID document comparison check', () => {
      const SOME_ID_COMPARISON_CHECK = new SandboxIdDocumentComparisonCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withIdDocumentComparisonCheck(SOME_ID_COMPARISON_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [SOME_ID_COMPARISON_CHECK],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withLivenessCheck', () => {
    it('builds a SandboxCheckReport with liveness check', () => {
      const SOME_LIVENESS_CHECK = new SandboxZoomLivenessCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withLivenessCheck(SOME_LIVENESS_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [SOME_LIVENESS_CHECK],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withDocumentFaceMatchCheck', () => {
    it('builds a SandboxCheckReport with FaceMatch check', () => {
      const SOME_FACE_MATCH_CHECK = new SandboxDocumentFaceMatchCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withDocumentFaceMatchCheck(SOME_FACE_MATCH_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [SOME_FACE_MATCH_CHECK],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
        }));
    });
  });

  describe('#withAsyncReportDelay', () => {
    it('builds a SandboxCheckReport with async report delay', () => {
      const checkReport = new SandboxCheckReportsBuilder()
        .withAsyncReportDelay(5)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
          async_report_delay: 5,
        }));
    });
  });

  describe('#withDocumentTextDataCheck', () => {
    it('builds a SandboxCheckReport with text data check', () => {
      const SOME_SUPPLEMENTARY_TEXT_DATA_CHECK = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      const checkReport = new SandboxCheckReportsBuilder()
        .withSupplementaryDocTextDataCheck(SOME_SUPPLEMENTARY_TEXT_DATA_CHECK)
        .build();

      expect(checkReport).toBeInstanceOf(SandboxCheckReports);

      expect(JSON.stringify(checkReport))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_CHECK: [],
          ID_DOCUMENT_AUTHENTICITY: [],
          ID_DOCUMENT_FACE_MATCH: [],
          LIVENESS: [],
          ID_DOCUMENT_COMPARISON: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [SOME_SUPPLEMENTARY_TEXT_DATA_CHECK],
        }));
    });

    describe('#withThirdPartyIdentityCheck', () => {
      it('builds a SandboxCheckReport with third party identity check', () => {
        const SOME_THIRD_PARTY_IDENTITY_CHECK = new SandboxThirdPartyIdentityCheckBuilder()
          .withRecommendation(SOME_RECOMMENDATION)
          .build();

        const checkReport = new SandboxCheckReportsBuilder()
          .withThirdPartyIdentityCheck(SOME_THIRD_PARTY_IDENTITY_CHECK)
          .build();

        expect(checkReport).toBeInstanceOf(SandboxCheckReports);

        expect(JSON.stringify(checkReport))
          .toEqual(JSON.stringify({
            ID_DOCUMENT_TEXT_DATA_CHECK: [],
            ID_DOCUMENT_AUTHENTICITY: [],
            ID_DOCUMENT_FACE_MATCH: [],
            LIVENESS: [],
            ID_DOCUMENT_COMPARISON: [],
            SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK: [],
            THIRD_PARTY_IDENTITY: SOME_THIRD_PARTY_IDENTITY_CHECK,
          }));
      });
    });
  });
});
