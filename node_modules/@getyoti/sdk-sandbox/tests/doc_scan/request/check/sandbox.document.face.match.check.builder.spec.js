const SandboxDocumentFaceMatchCheck = require('../../../../src/doc_scan/request/check/sandbox.document.face.match.check');

const {
  SandboxDocumentFilterBuilder,
  SandboxDocumentFaceMatchCheckBuilder,
  SandboxRecommendationBuilder,
  SandboxBreakdownBuilder,
} = require('../../../..');

const SOME_RECOMMENDATION = new SandboxRecommendationBuilder()
  .withValue('some-value')
  .build();

const SOME_BREAKDOWN = new SandboxBreakdownBuilder()
  .withResult('some-result')
  .withSubCheck('some-check')
  .build();

const SOME_FILTER = new SandboxDocumentFilterBuilder().build();

describe('SandboxDocumentFaceMatchCheckBuilder', () => {
  describe('#withRecommendation', () => {
    it('Should build SandboxDocumentFaceMatchCheck with recommendation', () => {
      const check = new SandboxDocumentFaceMatchCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxDocumentFaceMatchCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
          },
        }));
    });
  });

  describe('#withBreakdown', () => {
    it('Should build SandboxDocumentFaceMatchCheck with breakdown', () => {
      const check = new SandboxDocumentFaceMatchCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdown(SOME_BREAKDOWN)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxDocumentFaceMatchCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [SOME_BREAKDOWN],
            },
          },
        }));
    });
  });

  describe('#withBreakdowns', () => {
    it('Should build SandboxDocumentFaceMatchCheck with breakdown', () => {
      const check = new SandboxDocumentFaceMatchCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdowns([SOME_BREAKDOWN])
        .build();

      expect(check)
        .toBeInstanceOf(SandboxDocumentFaceMatchCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [SOME_BREAKDOWN],
            },
          },
        }));
    });
  });

  describe('#withDocumentFilter', () => {
    it('Should build SandboxDocumentFaceMatchCheck with document filter', () => {
      const check = new SandboxDocumentFaceMatchCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withDocumentFilter(SOME_FILTER)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxDocumentFaceMatchCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
          },
          document_filter: SOME_FILTER,
        }));
    });
  });
});
