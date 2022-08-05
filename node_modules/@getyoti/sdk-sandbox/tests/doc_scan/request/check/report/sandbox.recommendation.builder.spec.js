const {
  SandboxRecommendationBuilder,
} = require('../../../../..');
const SandboxRecommendation = require('../../../../../src/doc_scan/request/check/report/sandbox.recommendation');

const SOME_VALUE = 'some-value';
const SOME_REASON = 'some-reason';
const SOME_SUGGESTION = 'some-suggestion';

describe('SandboxRecommendationBuilder', () => {
  describe('#build', () => {
    it('builds a SandboxRecommendation', () => {
      const recommendation = new SandboxRecommendationBuilder()
        .withValue(SOME_VALUE)
        .withReason(SOME_REASON)
        .withRecoverySuggestion(SOME_SUGGESTION)
        .build();

      expect(recommendation).toBeInstanceOf(SandboxRecommendation);

      expect(JSON.stringify(recommendation))
        .toEqual(JSON.stringify({
          value: SOME_VALUE,
          reason: SOME_REASON,
          recovery_suggestion: SOME_SUGGESTION,
        }));
    });
  });
});
