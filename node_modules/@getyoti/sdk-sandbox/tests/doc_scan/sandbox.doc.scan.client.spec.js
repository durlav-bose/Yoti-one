const fs = require('fs');
const path = require('path');
const nock = require('nock');

const {
  SandboxDocScanClientBuilder,
  SandboxResponseConfigBuilder,
  SandboxCheckReportsBuilder,
} = require('../..');

const DocScanSandboxError = require('../../src/doc_scan/doc.scan.sandbox.error');

const SOME_PEM = fs.readFileSync(path.join(__dirname, '../sample-data/keys/test.pem'));
const SOME_URL = 'https://example.com/';
const SOME_SDK_ID = 'some-sdk-id';
const SOME_SESSION_ID = 'some-session-id';

describe('SandboxDocScanClient', () => {
  const client = new SandboxDocScanClientBuilder()
    .withClientSdkId(SOME_SDK_ID)
    .withPemString(SOME_PEM)
    .withSandboxUrl(SOME_URL)
    .build();

  describe('#configureSessionResponse', () => {
    it('Resolves on success', () => {
      const SOME_RESPONSE_CONFIG = new SandboxResponseConfigBuilder()
        .withCheckReports(new SandboxCheckReportsBuilder().build())
        .build();

      nock(SOME_URL)
        .put(
          new RegExp(`^/sessions/${SOME_SESSION_ID}/response-config\\?sdkId=${SOME_SDK_ID}&nonce=.*&timestamp=.*`),
          JSON.stringify(SOME_RESPONSE_CONFIG)
        )
        .reply(200);

      expect(client.configureSessionResponse(SOME_SESSION_ID, SOME_RESPONSE_CONFIG))
        .resolves
        .toBeUndefined();
    });

    it('Rejects on failure', () => {
      const SOME_RESPONSE_CONFIG = new SandboxResponseConfigBuilder()
        .withCheckReports(new SandboxCheckReportsBuilder().build())
        .build();

      nock(SOME_URL)
        .put(
          new RegExp(`^/sessions/${SOME_SESSION_ID}/response-config\\?sdkId=${SOME_SDK_ID}&nonce=.*&timestamp=.*`),
          JSON.stringify(SOME_RESPONSE_CONFIG)
        )
        .reply(400, {});

      return expect(client.configureSessionResponse(SOME_SESSION_ID, SOME_RESPONSE_CONFIG))
        .rejects
        .toEqual(new DocScanSandboxError(new Error('Bad Request')));
    });
  });

  describe('#configureApplicationResponse', () => {
    it('Resolves on success', () => {
      const SOME_RESPONSE_CONFIG = new SandboxResponseConfigBuilder()
        .withCheckReports(new SandboxCheckReportsBuilder().build())
        .build();

      nock(SOME_URL)
        .put(
          new RegExp(`^/apps/${SOME_SDK_ID}/response-config\\?nonce=.*&timestamp=.*`),
          JSON.stringify(SOME_RESPONSE_CONFIG)
        )
        .reply(200);

      expect(client.configureApplicationResponse(SOME_RESPONSE_CONFIG))
        .resolves
        .toBeUndefined();
    });

    it('Rejects on failure', () => {
      const SOME_RESPONSE_CONFIG = new SandboxResponseConfigBuilder()
        .withCheckReports(new SandboxCheckReportsBuilder().build())
        .build();

      nock(SOME_URL)
        .put(
          new RegExp(`^/apps/${SOME_SDK_ID}/response-config\\?nonce=.*&timestamp=.*`),
          JSON.stringify(SOME_RESPONSE_CONFIG)
        )
        .reply(400, {});

      return expect(client.configureApplicationResponse(SOME_RESPONSE_CONFIG))
        .rejects
        .toEqual(new DocScanSandboxError(new Error('Bad Request')));
    });
  });
});
