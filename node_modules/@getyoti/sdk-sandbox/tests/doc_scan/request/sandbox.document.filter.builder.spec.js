const {
  SandboxDocumentFilterBuilder,
} = require('../../..');

const SandboxDocumentFilter = require('../../../src/doc_scan/request/sandbox.document.filter');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';
const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('SandboxDocumentFilterBuilder', () => {
  describe('#build', () => {
    it('builds a SandboxDocumentFilter', () => {
      const filter = new SandboxDocumentFilterBuilder().build();

      expect(filter).toBeInstanceOf(SandboxDocumentFilter);
    });

    it('builds a SandboxDocumentFilter with document types', () => {
      const filter = new SandboxDocumentFilterBuilder()
        .withDocumentType(SOME_DOCUMENT_TYPE)
        .withDocumentType(SOME_OTHER_DOCUMENT_TYPE)
        .build();

      expect(JSON.stringify(filter))
        .toEqual(JSON.stringify({
          document_types: [
            SOME_DOCUMENT_TYPE,
            SOME_OTHER_DOCUMENT_TYPE,
          ],
          country_codes: [],
        }));
    });

    it('builds a SandboxDocumentFilter with country codes', () => {
      const filter = new SandboxDocumentFilterBuilder()
        .withCountryCode(SOME_COUNTRY_CODE)
        .withCountryCode(SOME_OTHER_COUNTRY_CODE)
        .build();

      expect(JSON.stringify(filter))
        .toEqual(JSON.stringify({
          document_types: [],
          country_codes: [
            SOME_COUNTRY_CODE,
            SOME_OTHER_COUNTRY_CODE,
          ],
        }));
    });

    it('builds a SandboxDocumentFilter with document types and country codes', () => {
      const filter = new SandboxDocumentFilterBuilder()
        .withDocumentType(SOME_DOCUMENT_TYPE)
        .withDocumentType(SOME_OTHER_DOCUMENT_TYPE)
        .withCountryCode(SOME_COUNTRY_CODE)
        .withCountryCode(SOME_OTHER_COUNTRY_CODE)
        .build();

      expect(JSON.stringify(filter))
        .toEqual(JSON.stringify({
          document_types: [
            SOME_DOCUMENT_TYPE,
            SOME_OTHER_DOCUMENT_TYPE,
          ],
          country_codes: [
            SOME_COUNTRY_CODE,
            SOME_OTHER_COUNTRY_CODE,
          ],
        }));
    });
  });
});
