const SandboxDocumentIdPhoto = require('../../../../src/doc_scan/request/task/sandbox.document.id.photo');

describe('SandboxDocumentIdPhoto', () => {
  it('should serialize to JSON correctly', () => {
    const SOME_CONTENT_TYPE = 'image/jpeg';
    const SOME_DATA = Buffer.from('some-image-data');

    const documentIdPhoto = new SandboxDocumentIdPhoto(SOME_CONTENT_TYPE, SOME_DATA);

    expect(JSON.stringify(documentIdPhoto))
      .toEqual(JSON.stringify({
        content_type: SOME_CONTENT_TYPE,
        data: SOME_DATA.toString('base64'),
      }));
  });
});
