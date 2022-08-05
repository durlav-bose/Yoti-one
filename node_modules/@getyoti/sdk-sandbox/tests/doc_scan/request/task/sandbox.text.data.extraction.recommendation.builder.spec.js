const {
  SandboxTextDataExtractionRecommendationBuilder,
  SandboxTextDataExtractionReasonBuilder,
} = require('../../../..');

const SandboxTextDataExtractionRecommendation = require('../../../../src/doc_scan/request/task/sandbox.text.data.extraction.recommendation');

const VALUE_MUST_TRY_AGAIN = 'MUST_TRY_AGAIN';
const VALUE_SHOULD_TRY_AGAIN = 'SHOULD_TRY_AGAIN';
const VALUE_PROGRESS = 'PROGRESS';

describe('SandboxTextDataExtractionRecommendationBuilder', () => {
  describe('#build', () => {
    it('Builds SandboxTextDataExtractionRecommendation', () => {
      const recommendation = new SandboxTextDataExtractionRecommendationBuilder()
        .forProgress()
        .build();

      expect(recommendation).toBeInstanceOf(SandboxTextDataExtractionRecommendation);
    });
  });

  describe('#forProgress', () => {
    it('Builds SandboxTextDataExtractionRecommendation for progress', () => {
      const recommendation = new SandboxTextDataExtractionRecommendationBuilder()
        .forProgress()
        .build();

      expect(JSON.stringify(recommendation))
        .toEqual(JSON.stringify({
          value: VALUE_PROGRESS,
        }));
    });
  });

  describe('#forMustTryAgain', () => {
    it('Builds SandboxTextDataExtractionRecommendation for must try again', () => {
      const recommendation = new SandboxTextDataExtractionRecommendationBuilder()
        .forMustTryAgain()
        .build();

      expect(JSON.stringify(recommendation))
        .toEqual(JSON.stringify({
          value: VALUE_MUST_TRY_AGAIN,
        }));
    });
  });

  describe('#forShouldTryAgain', () => {
    it('Builds SandboxTextDataExtractionRecommendation for should try again', () => {
      const recommendation = new SandboxTextDataExtractionRecommendationBuilder()
        .forShouldTryAgain()
        .build();

      expect(JSON.stringify(recommendation))
        .toEqual(JSON.stringify({
          value: VALUE_SHOULD_TRY_AGAIN,
        }));
    });
  });

  describe('#withReason', () => {
    it('Builds SandboxTextDataExtractionRecommendation with reason', () => {
      const SOME_REASON = new SandboxTextDataExtractionReasonBuilder()
        .forQuality()
        .build();

      const recommendation = new SandboxTextDataExtractionRecommendationBuilder()
        .forMustTryAgain()
        .withReason(SOME_REASON)
        .build();

      expect(JSON.stringify(recommendation))
        .toEqual(JSON.stringify({
          value: VALUE_MUST_TRY_AGAIN,
          reason: SOME_REASON,
        }));
    });
  });
});
