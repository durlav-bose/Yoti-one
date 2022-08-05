const nock = require('nock');
const fs = require('fs');
const { SandboxProfileClientBuilder, TokenRequestBuilder } = require('../..');
const SandboxClient = require('../../src/profile/client');

const SOME_SDK_ID = 'someSdkId';
const DEFAULT_SANDBOX_URL = 'https://api.yoti.com/sandbox/v1';
const SOME_SANDBOX_URL = 'https://somesandbox.yoti.com/api/v1';
const SOME_ENDPOINT_PATTERN = new RegExp(`^/sandbox/v1/apps/${SOME_SDK_ID}/tokens`);
const SOME_PEM_FILE_PATH = './tests/sample-data/keys/test.pem';
const SOME_PEM_STRING = fs.readFileSync(SOME_PEM_FILE_PATH, 'utf8');
const SOME_PEM_BUFFER = Buffer.from(SOME_PEM_STRING);
const SOME_TOKEN_REQUEST = new TokenRequestBuilder().build();
const SOME_TOKEN = 'someToken';

describe('SandboxClient', () => {
  it('should build with pem string', () => {
    const sandboxClient = new SandboxProfileClientBuilder()
      .withClientSdkId(SOME_SDK_ID)
      .withPemString(SOME_PEM_STRING)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
  });
  it('should build with pem buffer', () => {
    const sandboxClient = new SandboxProfileClientBuilder()
      .withClientSdkId(SOME_SDK_ID)
      .withPemString(SOME_PEM_BUFFER)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
  });
  it('should build with pem file path', () => {
    const sandboxClient = new SandboxProfileClientBuilder()
      .withClientSdkId(SOME_SDK_ID)
      .withPemFilePath(SOME_PEM_FILE_PATH)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
  });
  it('should build with custom sandbox URL', () => {
    const sandboxClient = new SandboxProfileClientBuilder()
      .withClientSdkId(SOME_SDK_ID)
      .withPemString(SOME_PEM_STRING)
      .withSandboxUrl(SOME_SANDBOX_URL)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
  });
  describe('#constructor', () => {
    it('should throw for missing app ID', () => {
      expect(() => new SandboxProfileClientBuilder().build())
        .toThrow(new TypeError('sdkId must be a string'));
    });
    it('should throw for missing key', () => {
      expect(() => new SandboxProfileClientBuilder().withClientSdkId(SOME_SDK_ID).build())
        .toThrow(new TypeError('pem cannot be null or empty'));
    });
  });
  describe('#setupSharingProfile', () => {
    const sandboxClient = new SandboxProfileClientBuilder()
      .withClientSdkId(SOME_SDK_ID)
      .withPemString(SOME_PEM_STRING)
      .build();

    /**
     * Observe the console log.
     */
    let consoleLog;
    beforeEach(() => {
      consoleLog = jest.spyOn(global.console, 'log');
    });

    /**
     * Clean up and restore mocks.
     */
    afterEach((done) => {
      nock.cleanAll();
      done();
      consoleLog.mockRestore();
    });

    it('should return token from sandbox', (done) => {
      nock(DEFAULT_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, { token: SOME_TOKEN });

      sandboxClient.setupSharingProfile(SOME_TOKEN_REQUEST)
        .then((response) => {
          expect(response.getToken()).toBe(SOME_TOKEN);
          done();
        })
        .catch(done);
    });
    it('should throw error when invalid response is returned', (done) => {
      nock(DEFAULT_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, '""');

      sandboxClient
        .setupSharingProfile(SOME_TOKEN_REQUEST)
        .catch((err) => {
          const expectedMessage = 'TokenResponse responseData should be an object';
          expect(err.message).toBe(expectedMessage);
          expect(consoleLog)
            .toHaveBeenCalledWith(`Error getting response data: Error: ${expectedMessage}`);
          done();
        });
    });
    it('should throw error when response has no token', (done) => {
      nock(DEFAULT_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, '{}');

      sandboxClient
        .setupSharingProfile(SOME_TOKEN_REQUEST)
        .catch((err) => {
          const expectedMessage = 'responseData.token must be a string';
          expect(err.message).toBe(expectedMessage);
          expect(consoleLog)
            .toHaveBeenCalledWith(`Error getting response data: TypeError: ${expectedMessage}`);
          done();
        });
    });
    [
      {
        error: 'Bad Request',
        status: 400,
      },
      {
        error: 'Internal Server Error',
        status: 500,
      },
    ].forEach((invalidResponse) => {
      it(`should throw error when response is ${invalidResponse.status}`, (done) => {
        nock(DEFAULT_SANDBOX_URL)
          .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
          .reply(invalidResponse.status, '{}');

        sandboxClient
          .setupSharingProfile(SOME_TOKEN_REQUEST)
          .catch((err) => {
            expect(err.message).toBe(invalidResponse.error);
            expect(consoleLog)
              .toHaveBeenCalledWith(`Error getting data from Connect API: ${invalidResponse.error}`);
            done();
          });
      });
    });
  });
});
