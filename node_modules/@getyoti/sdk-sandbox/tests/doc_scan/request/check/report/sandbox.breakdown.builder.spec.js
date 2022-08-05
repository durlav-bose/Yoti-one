const { SandboxBreakdownBuilder } = require('../../../../..');
const SandboxBreakdown = require('../../../../../src/doc_scan/request/check/report/sandbox.breakdown');

const SOME_SUB_CHECK = 'some-sub-check';
const SOME_DETAIL_KEY = 'some-detail-key';
const SOME_DETAIL_VALUE = 'some-detail-value';
const SOME_RESULT = 'some-result';

describe('SandboxBreakdownBuilder', () => {
  describe('#build', () => {
    it('builds a SandboxBreakdown', () => {
      const sandboxBreakdown = new SandboxBreakdownBuilder()
        .withSubCheck(SOME_SUB_CHECK)
        .withDetail(SOME_DETAIL_KEY, SOME_DETAIL_VALUE)
        .withResult(SOME_RESULT)
        .build();

      expect(sandboxBreakdown).toBeInstanceOf(SandboxBreakdown);

      expect(JSON.stringify(sandboxBreakdown))
        .toEqual(JSON.stringify({
          sub_check: SOME_SUB_CHECK,
          result: SOME_RESULT,
          details: [
            {
              name: SOME_DETAIL_KEY,
              value: SOME_DETAIL_VALUE,
            },
          ],
        }));
    });
  });
});
