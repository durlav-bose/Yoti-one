const SandboxThirdPartyIdentityCheck = require('../../../../src/doc_scan/request/check/sandbox.third.party.identity.check');

const {
  SandboxThirdPartyIdentityCheckBuilder,
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

const ANOTHER_BREAKDOWN = new SandboxBreakdownBuilder()
  .withResult('another-result')
  .withSubCheck('another-check')
  .build();

describe('SandboxThirdPartyIdentityCheckBuilder', () => {
  describe('#withRecommendation', () => {
    it('Should build SandboxThirdPartyIdentityCheck with recommendation', () => {
      const check = new SandboxThirdPartyIdentityCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxThirdPartyIdentityCheck);

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
    it('Should build SandboxThirdPartyIdentityCheck with breakdown', () => {
      const check = new SandboxThirdPartyIdentityCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdown(SOME_BREAKDOWN)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxThirdPartyIdentityCheck);

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
    it('Should build SandboxThirdPartyIdentityCheck with breakdown', () => {
      const check = new SandboxThirdPartyIdentityCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdowns([SOME_BREAKDOWN, ANOTHER_BREAKDOWN])
        .build();

      expect(check)
        .toBeInstanceOf(SandboxThirdPartyIdentityCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [SOME_BREAKDOWN, ANOTHER_BREAKDOWN],
            },
          },
        }));
    });
  });
});
