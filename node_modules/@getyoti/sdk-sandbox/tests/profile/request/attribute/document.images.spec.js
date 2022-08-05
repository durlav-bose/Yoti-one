const {
  SandboxDocumentImagesBuilder,
} = require('../../../..');

const {
  dataUrl,
} = require('../../helpers');

const SOME_JPEG_CONTENT = Buffer.from('some-jpeg-content');
const SOME_PNG_CONTENT = Buffer.from('some-png-content');

describe('SandboxDocumentImages', () => {
  it('should build with JPEG', () => {
    const documentImages = new SandboxDocumentImagesBuilder()
      .withJpegContent(SOME_JPEG_CONTENT)
      .build();

    expect(documentImages.getValue())
      .toBe(dataUrl(SOME_JPEG_CONTENT, 'image/jpeg'));
  });

  it('should build with PNG', () => {
    const documentImages = new SandboxDocumentImagesBuilder()
      .withPngContent(SOME_PNG_CONTENT)
      .build();

    expect(documentImages.getValue())
      .toBe(dataUrl(SOME_PNG_CONTENT, 'image/png'));
  });

  it('should build with multiple images', () => {
    const documentImages = new SandboxDocumentImagesBuilder()
      .withJpegContent(SOME_JPEG_CONTENT)
      .withPngContent(SOME_PNG_CONTENT)
      .withPngContent(SOME_PNG_CONTENT)
      .build();

    const expected = [
      dataUrl(SOME_JPEG_CONTENT, 'image/jpeg'),
      dataUrl(SOME_PNG_CONTENT, 'image/png'),
      dataUrl(SOME_PNG_CONTENT, 'image/png'),
    ].join('&');

    expect(documentImages.getValue()).toBe(expected);
  });
});
