const {
  SandboxResponseConfigBuilder,
  SandboxCheckReportsBuilder,
  SandboxTaskResultsBuilder,
  SandboxDocumentTextDataExtractionTaskBuilder,
} = require('../../..');
const SandboxResponseConfig = require('../../../src/doc_scan/request/sandbox.response.config');

const SOME_CHECK_REPORTS = new SandboxCheckReportsBuilder().build();
const SOME_TASK = new SandboxDocumentTextDataExtractionTaskBuilder()
  .build();
const SOME_TASK_RESULTS = new SandboxTaskResultsBuilder()
  .withDocumentTextDataExtractionTask(SOME_TASK)
  .build();

describe('SandboxResponseConfigBuilder', () => {
  describe('#build', () => {
    it('builds a SandboxResponseConfig with check reports', () => {
      const responseConfig = new SandboxResponseConfigBuilder()
        .withCheckReports(SOME_CHECK_REPORTS)
        .build();

      expect(responseConfig).toBeInstanceOf(SandboxResponseConfig);

      expect(JSON.stringify(responseConfig))
        .toEqual(JSON.stringify({
          check_reports: SOME_CHECK_REPORTS,
        }));
    });
  });

  describe('#withTaskResults', () => {
    it('builds a SandboxResponseConfig with task results', () => {
      const responseConfig = new SandboxResponseConfigBuilder()
        .withCheckReports(SOME_CHECK_REPORTS)
        .withTaskResults(SOME_TASK_RESULTS)
        .build();

      expect(responseConfig).toBeInstanceOf(SandboxResponseConfig);

      expect(JSON.stringify(responseConfig))
        .toEqual(JSON.stringify({
          task_results: SOME_TASK_RESULTS,
          check_reports: SOME_CHECK_REPORTS,
        }));
    });
  });
});
