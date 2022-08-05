const SandboxDocumentTextDataExtractionTask = require('../../../../src/doc_scan/request/task/sandbox.document.text.data.extraction.task');

const {
  SandboxDocumentTextDataExtractionTaskBuilder,
  SandboxDocumentFilterBuilder,
  SandboxTextDataExtractionRecommendationBuilder,
} = require('../../../..');

const SOME_KEY = 'some-key';
const SOME_VALUE = 'some-value';
const SOME_OTHER_KEY = 'some-other-key';
const SOME_NESTED_VALUE = {
  'some-nested-key': 'some-nested-value',
};

describe('SandboxDocumentTextDataExtractionTaskBuilder', () => {
  describe('#build', () => {
    it('Builds SandboxDocumentTextDataExtractionTask', () => {
      const task = new SandboxDocumentTextDataExtractionTaskBuilder().build();

      expect(task).toBeInstanceOf(SandboxDocumentTextDataExtractionTask);
    });
  });

  describe('#withDocumentField', () => {
    it('Builds SandboxDocumentTextDataExtractionTask with document fields', () => {
      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
        .withDocumentField(SOME_KEY, SOME_VALUE)
        .withDocumentField(SOME_OTHER_KEY, SOME_NESTED_VALUE)
        .build();

      expect(task).toBeInstanceOf(SandboxDocumentTextDataExtractionTask);

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
    it('Builds SandboxDocumentTextDataExtractionTask with document fields', () => {
      const SOME_DOCUMENT_FIELDS = {
        [SOME_KEY]: SOME_VALUE,
        [SOME_OTHER_KEY]: SOME_NESTED_VALUE,
      };

      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
        .withDocumentFields(SOME_DOCUMENT_FIELDS)
        .build();

      expect(task).toBeInstanceOf(SandboxDocumentTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            document_fields: SOME_DOCUMENT_FIELDS,
          },
        }));
    });
  });

  describe('#withDocumentFilter', () => {
    it('Builds SandboxDocumentTextDataExtractionTask with document filter', () => {
      const SOME_FILTER = new SandboxDocumentFilterBuilder().build();

      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
        .withDocumentFilter(SOME_FILTER)
        .build();

      expect(task).toBeInstanceOf(SandboxDocumentTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {},
          document_filter: SOME_FILTER,
        }));
    });
  });

  describe('#withDocumentIdPhoto', () => {
    it('Builds SandboxDocumentTextDataExtractionTask with document ID photo', () => {
      const SOME_CONTENT_TYPE = 'image/jpeg';
      const SOME_DATA = Buffer.from('some-image-data');

      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
        .withDocumentIdPhoto(SOME_CONTENT_TYPE, SOME_DATA)
        .build();

      expect(task).toBeInstanceOf(SandboxDocumentTextDataExtractionTask);

      expect(JSON.stringify(task))
        .toEqual(JSON.stringify({
          result: {
            document_id_photo: {
              content_type: SOME_CONTENT_TYPE,
              data: SOME_DATA.toString('base64'),
            },
          },
        }));
    });
  });

  describe('#withDetectedCountry', () => {
    it('Builds SandboxDocumentTextDataExtractionTask with detected country', () => {
      const SOME_COUNTRY = 'some-country';

      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
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
    it('Builds SandboxDocumentTextDataExtractionTask with recommendation', () => {
      const SOME_RECOMMENDATION = new SandboxTextDataExtractionRecommendationBuilder()
        .forProgress()
        .build();

      const task = new SandboxDocumentTextDataExtractionTaskBuilder()
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
