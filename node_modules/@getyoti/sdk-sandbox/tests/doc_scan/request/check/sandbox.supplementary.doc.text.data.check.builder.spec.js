const SandboxSupplementaryDocTextDataCheck = require('../../../../src/doc_scan/request/check/sandbox.supplementary.doc.text.data.check');

const {
  SandboxDocumentFilterBuilder,
  SandboxSupplementaryDocTextDataCheckBuilder,
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

const SOME_FILTER = new SandboxDocumentFilterBuilder().build();

const SOME_KEY = 'some-key';
const SOME_VALUE = 'some-value';
const SOME_OTHER_KEY = 'some-other-key';
const SOME_NESTED_VALUE = {
  'some-nested-key': 'some-nested-value',
};

describe('SandboxSupplementaryDocTextDataCheckBuilder', () => {
  describe('#withRecommendation', () => {
    it('Should build SandboxSupplementaryDocTextDataCheck with recommendation', () => {
      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

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
    it('Should build SandboxSupplementaryDocTextDataCheck with breakdown', () => {
      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdown(SOME_BREAKDOWN)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

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
    it('Should build SandboxSupplementaryDocTextDataCheck with breakdown', () => {
      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withBreakdowns([SOME_BREAKDOWN])
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

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

  describe('#withDocumentFields', () => {
    it('Should build SandboxSupplementaryDocTextDataCheck with document fields', () => {
      const SOME_DOCUMENT_FIELDS = {
        [SOME_KEY]: SOME_VALUE,
        [SOME_OTHER_KEY]: SOME_NESTED_VALUE,
      };

      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withDocumentFields(SOME_DOCUMENT_FIELDS)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
            document_fields: SOME_DOCUMENT_FIELDS,
          },
        }));
    });
  });

  describe('#withDocumentField', () => {
    it('Should build SandboxSupplementaryDocTextDataCheck with document fields', () => {
      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withDocumentField(SOME_KEY, SOME_VALUE)
        .withDocumentField(SOME_OTHER_KEY, SOME_NESTED_VALUE)
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
            document_fields: {
              [SOME_KEY]: SOME_VALUE,
              [SOME_OTHER_KEY]: SOME_NESTED_VALUE,
            },
          },
        }));
    });
  });

  describe('#withDocumentFilter', () => {
    it('Should build SandboxSupplementaryDocTextDataCheck with document filter', () => {
      const check = new SandboxSupplementaryDocTextDataCheckBuilder()
        .withRecommendation(SOME_RECOMMENDATION)
        .withDocumentFilter(new SandboxDocumentFilterBuilder().build())
        .build();

      expect(check)
        .toBeInstanceOf(SandboxSupplementaryDocTextDataCheck);

      expect(JSON.stringify(check))
        .toEqual(JSON.stringify({
          result: {
            report: {
              recommendation: SOME_RECOMMENDATION,
              breakdown: [],
            },
          },
          document_filter: SOME_FILTER,
        }));
    });
  });
});
