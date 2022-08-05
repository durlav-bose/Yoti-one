const SandboxLivenessCheck = require('../../../../src/doc_scan/request/check/sandbox.liveness.check');
const SandboxZoomLivenessCheck = require('../../../../src/doc_scan/request/check/sandbox.zoom.liveness.check');

const {
  SandboxZoomLivenessCheckBuilder,
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

const LIVENESS_TYPE_ZOOM = 'ZOOM';

describe('SandboxZoomLivenessCheckBuilder', () => {
  describe('#withRecommendation', () => {
    it('Should build SandboxZoomLivenessCheck with recommendation', () => {
      const check = new SandboxZoomLivenessCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxLivenessCheck);

      expect(check)
        .toBeInstanceOf(SandboxZoomLivenessCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
          },
          liveness_type: LIVENESS_TYPE_ZOOM,
        }));
    });
  });

  describe('#withBreakdown', () => {
    it('Should build SandboxZoomLivenessCheck with breakdown', () => {
      const check = new SandboxZoomLivenessCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdown(SOME_BREAKDOWN)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxLivenessCheck);

      expect(check)
        .toBeInstanceOf(SandboxZoomLivenessCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [SOME_BREAKDOWN],
            },
          },
          liveness_type: LIVENESS_TYPE_ZOOM,
        }));
    });
  });

  describe('#withBreakdowns', () => {
    it('Should build SandboxZoomLivenessCheck with breakdown', () => {
      const check = new SandboxZoomLivenessCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdowns([SOME_BREAKDOWN])
        .build();

      expect(check)
        .toBeInstanceOf(SandboxLivenessCheck);

      expect(check)
        .toBeInstanceOf(SandboxZoomLivenessCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [SOME_BREAKDOWN],
            },
          },
          liveness_type: LIVENESS_TYPE_ZOOM,
        }));
    });
  });
});
