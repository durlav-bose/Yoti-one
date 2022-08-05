const SandboxSupplementaryDocTextDataExtractionTask = require('../../../../src/doc_scan/request/task/sandbox.supplementary.doc.text.data.extraction.task');

const {
  SandboxSupplementaryDocTextDataExtractionTaskBuilder,
  SandboxDocumentFilterBuilder,
  SandboxTextDataExtractionRecommendationBuilder,
} = require('../../../..');

const SOME_KEY = 'some-key';
const SOME_VALUE = 'some-value';
const SOME_OTHER_KEY = 'some-other-key';
const SOME_NESTED_VALUE = {
  'some-nested-key': 'some-nested-value',
};

describe('SandboxSupplementaryDocTextDataExtractionTaskBuilder', () => {
  describe('#build', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask', () => {
      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder().build();

      expect(task).toBeInstanceOf(SandboxSupplementaryDocTextDataExtractionTask);
    });
  });

  describe('#withDocumentField', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask with document fields', () => {
      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .withDocumentField(SOME_KEY, SOME_VALUE)
        .withDocumentField(SOME_OTHER_KEY, SOME_NESTED_VALUE)
        .build();

      expect(task).toBeInstanceOf(SandboxSupplementaryDocTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            document_fields: {
              [SOME_KEY]: SOME_VALUE,
              [SOME_OTHER_KEY]: SOME_NESTED_VALUE,
            },
          },
        }));
    });
  });

  describe('#withDocumentFields', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask with document fields', () => {
      const SOME_DOCUMENT_FIELDS = {
        [SOME_KEY]: SOME_VALUE,
        [SOME_OTHER_KEY]: SOME_NESTED_VALUE,
      };

      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .withDocumentFields(SOME_DOCUMENT_FIELDS)
        .build();

      expect(task).toBeInstanceOf(SandboxSupplementaryDocTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            document_fields: SOME_DOCUMENT_FIELDS,
          },
        }));
    });
  });

  describe('#withDocumentFilter', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask with document filter', () => {
      const SOME_FILTER = new SandboxDocumentFilterBuilder().build();

      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .withDocumentFilter(SOME_FILTER)
        .build();

      expect(task).toBeInstanceOf(SandboxSupplementaryDocTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {},
          document_filter: SOME_FILTER,
        }));
    });
  });

  describe('#withDetectedCountry', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask with detected country', () => {
      const SOME_COUNTRY = 'some-country';

      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .withDetectedCountry(SOME_COUNTRY)
        .build();

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            detected_country: SOME_COUNTRY,
          },
        }));
    });
  });

  describe('#withRecommendation', () => {
    it('Builds SandboxSupplementaryDocTextDataExtractionTask with recommendation', () => {
      const SOME_RECOMMENDATION = new SandboxTextDataExtractionRecommendationBuilder()
        .forProgress()
        .build();

      const task = new SandboxSupplementaryDocTextDataExtractionTaskBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            recommendation: SOME_RECOMMENDATION,
          },
        }));
    });
  });
});
