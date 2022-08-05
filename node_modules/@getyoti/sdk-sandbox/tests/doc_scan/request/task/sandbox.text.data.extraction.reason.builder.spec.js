const {
  SandboxTextDataExtractionReasonBuilder,
} = require('../../../..');
const SandboxTextDataExtractionReason = require('../../../../src/doc_scan/request/task/sandbox.text.data.extraction.reason');

const VALUE_QUALITY = 'QUALITY';
const VALUE_USER_ERROR = 'USER_ERROR';
const SOME_DETAIL = 'some-detail';

describe('SandboxTextDataExtractionReasonBuilder', () => {
  describe('#build', () => {
    it('Builds SandboxTextDataExtractionReason', () => {
      const reason = new SandboxTextDataExtractionReasonBuilder()
        .forQuality()
        .build();

      expect(reason).toBeInstanceOf(SandboxTextDataExtractionReason);
    });
  });

  describe('#forQuality', () => {
    it('Builds SandboxTextDataExtractionReason for quality', () => {
      const reason = new SandboxTextDataExtractionReasonBuilder()
        .forQuality()
        .build();

      expect(JSON.stringify(reason))
        .toEqual(JSON.stringify({
          value: VALUE_QUALITY,
        }));
    });
  });

  describe('#forUserError', () => {
    it('Builds SandboxTextDataExtractionReason for user error', () => {
      const reason = new SandboxTextDataExtractionReasonBuilder()
        .forUserError()
        .build();

      expect(JSON.stringify(reason))
        .toEqual(JSON.stringify({
          value: VALUE_USER_ERROR,
        }));
    });
  });

  describe('#withDetail', () => {
    it('Builds SandboxTextDataExtractionReason with detail', () => {
      const reason = new SandboxTextDataExtractionReasonBuilder()
        .forUserError()
        .withDetail(SOME_DETAIL)
        .build();

      expect(JSON.stringify(reason))
        .toEqual(JSON.stringify({
          value: VALUE_USER_ERROR,
          detail: SOME_DETAIL,
        }));
    });
  });
});
