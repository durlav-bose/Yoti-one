const SandboxIdDocumentComparisonCheck = require('../../../../src/doc_scan/request/check/sandbox.id.document.comparison.check');

const {
  SandboxDocumentFilterBuilder,
  SandboxIdDocumentComparisonCheckBuilder,
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

describe('SandboxIdDocumentComparisonCheckBuilder', () => {
  describe('#withRecommendation', () => {
    it('Should build SandboxIdDocumentComparisonCheck with recommendation', () => {
      const check = new SandboxIdDocumentComparisonCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxIdDocumentComparisonCheck);

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
    it('Should build SandboxIdDocumentComparisonCheck with breakdown', () => {
      const check = new SandboxIdDocumentComparisonCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdown(SOME_BREAKDOWN)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxIdDocumentComparisonCheck);

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
    it('Should build SandboxIdDocumentComparisonCheck with breakdown', () => {
      const check = new SandboxIdDocumentComparisonCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdowns([SOME_BREAKDOWN])
        .build();

      expect(check)
        .toBeInstanceOf(SandboxIdDocumentComparisonCheck);

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

  describe('#withSecondaryDocumentFilter', () => {
    it('Should build SandboxIdDocumentComparisonCheck with secondary document filter', () => {
      const check = new SandboxIdDocumentComparisonCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withSecondaryDocumentFilter(SOME_FILTER)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxIdDocumentComparisonCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
          },
          secondary_document_filter: SOME_FILTER,
        }));
    });
  });
});
