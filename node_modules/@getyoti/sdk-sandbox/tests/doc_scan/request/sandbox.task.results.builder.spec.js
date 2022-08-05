const {
  SandboxTaskResultsBuilder,
  SandboxSupplementaryDocTextDataExtractionTaskBuilder,
  SandboxDocumentTextDataExtractionTaskBuilder,
} = require('../../..');
const SandboxTaskResults = require('../../../src/doc_scan/request/sandbox.task.results');

describe('SandboxTaskResultsBuilder', () => {
  describe('#build', () => {
    it('builds SandboxTaskResults', () => {
      const taskResults = new SandboxTaskResultsBuilder().build();

      expect(taskResults).toBeInstanceOf(SandboxTaskResults);

      expect(JSON.stringify(taskResults))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_EXTRACTION: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION: [],
        }));
    });
  });

  describe('#withSupplementaryDocTextDataExtractionTask', () => {
    it('builds with SandboxSupplementaryDocTextDataExtractionTask', () => {
      const SOME_TEXT_EXTRACTION_TASK = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .build();

      const taskResults = new SandboxTaskResultsBuilder()
        .withSupplementaryDocTextDataExtractionTask(SOME_TEXT_EXTRACTION_TASK)
        .build();

      expect(JSON.stringify(taskResults))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_EXTRACTION: [],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION: [SOME_TEXT_EXTRACTION_TASK],
        }));
    });
  });

  describe('#withDocumentTextDataExtractionTask', () => {
    it('builds with SandboxDocumentTextDataExtractionTask', () => {
      const SOME_TEXT_EXTRACTION_TASK = new SandboxDocumentTextDataExtractionTaskBuilder()
        .build();

      const taskResults = new SandboxTaskResultsBuilder()
        .withDocumentTextDataExtractionTask(SOME_TEXT_EXTRACTION_TASK)
        .build();

      expect(JSON.stringify(taskResults))
        .toEqual(JSON.stringify({
          ID_DOCUMENT_TEXT_DATA_EXTRACTION: [SOME_TEXT_EXTRACTION_TASK],
          SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION: [],
        }));
    });
  });
});
