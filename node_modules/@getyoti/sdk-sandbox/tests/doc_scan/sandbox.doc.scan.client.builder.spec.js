const nock = require('nock');
const fs = require('fs');
const path = require('path');
const {
  SandboxDocScanClientBuilder,
  SandboxResponseConfigBuilder,
  SandboxCheckReportsBuilder,
} = require('../..');
const SandboxDocScanClient = require('../../src/doc_scan/sandbox.doc.scan.client');

const SOME_SANDBOX_URL = 'https://example.com';
const SOME_SESSION_ID = 'some-session-id';
const SOME_PEM = fs.readFileSync(path.join(__dirname, '../sample-data/keys/test.pem'));

describe('SandboxDocScanClientBuilder', () => {
  describe('#build', () => {
    it('Builds SandboxDocScanClient', () => {
      const client = new SandboxDocScanClientBuilder()
        .withClientSdkId('some-sdk-id')
        .withPemString(SOME_PEM)
        .build();

      expect(client).toBeInstanceOf(SandboxDocScanClient);
    });

    it('Builds SandboxDocScanClient with custom sandbox URL', () => {
      const client = new SandboxDocScanClientBuilder()
        .withClientSdkId('some-sdk-id')
        .withPemString(SOME_PEM)
        .withSandboxUrl(SOME_SANDBOX_URL)
        .build();

      nock(SOME_SANDBOX_URL)
        .put(new RegExp(`^/sessions/${SOME_SESSION_ID}/response-config`))
        .reply(200);

      const response = client.configureSessionResponse(
        SOME_SESSION_ID,
        new SandboxResponseConfigBuilder()
          .withCheckReports(new SandboxCheckReportsBuilder().build())
          .build()
      );

      expect(response).resolves.toBeUndefined();
    });
  });
});
