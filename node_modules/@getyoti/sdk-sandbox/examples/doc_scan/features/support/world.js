require('dotenv').config();

const {
  Builder,
  By,
} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const {
  SandboxDocScanClientBuilder,
  SandboxBreakdownBuilder,
  SandboxRecommendationBuilder,
  SandboxDocumentAuthenticityCheckBuilder,
  SandboxCheckReportsBuilder,
  SandboxResponseConfigBuilder,
  SandboxDocumentTextDataCheckBuilder,
  SandboxTaskResultsBuilder,
  SandboxDocumentTextDataExtractionTaskBuilder,
} = require('@getyoti/sdk-sandbox');

const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const fs = require('fs');

const APP_BASE_URL = process.env.YOTI_APP_BASE_URL;
const CLIENT_SDK_ID = process.env.YOTI_SANDBOX_CLIENT_SDK_ID;
const PEM_STRING = fs.readFileSync(process.env.YOTI_KEY_FILE_PATH, 'utf8');
const DOCUMENT_IMAGE_PATH = '/usr/src/resources/image.jpg';
const WD_PORT = process.env.WD_PORT;

class World {
  constructor() {
    this.sandboxClient = new SandboxDocScanClientBuilder()
      .withPemString(PEM_STRING)
      .withClientSdkId(CLIENT_SDK_ID)
      .build();

    this.webDriver = new Builder()
      .forBrowser('chrome')
      .usingServer(`http://localhost:${WD_PORT}/wd/hub`)
      .setChromeOptions(
        new chrome.Options()
          .headless()
          .addArguments([
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1280,2000',
            '--ignore-certificate-errors',
          ])
      )
      .build();

    const TIMEOUT = 5000;
    this.webDriver.manage().setTimeouts({
      implicit: TIMEOUT,
      pageLoad: TIMEOUT,
      script: TIMEOUT,
    });
  }

  /**
   * Set sandbox expectation for the current session.
   */
  async configureSessionResponse() {
    const iframeUrl = await this.webDriver.findElement(By.tagName('iframe')).getAttribute('src');
    const sessionId = new URL(iframeUrl).searchParams.get('sessionID');

    const responseConfig = new SandboxResponseConfigBuilder()
      .withCheckReports(
        new SandboxCheckReportsBuilder()
          .withAsyncReportDelay(5)
          .withDocumentAuthenticityCheck(
            new SandboxDocumentAuthenticityCheckBuilder()
              .withBreakdown(
                new SandboxBreakdownBuilder()
                  .withSubCheck('security_features')
                  .withResult('NOT_AVAILABLE')
                  .withDetail('some_detail', 'some_detail_value')
                  .build()
              )
              .withRecommendation(
                new SandboxRecommendationBuilder()
                  .withValue('NOT_AVAILABLE')
                  .withReason('PICTURE_TOO_DARK')
                  .withRecoverySuggestion('BETTER_LIGHTING')
                  .build()
              )
              .build()
          )
          .withDocumentTextDataCheck(
            new SandboxDocumentTextDataCheckBuilder()
              .withBreakdown(
                new SandboxBreakdownBuilder()
                  .withSubCheck('document_in_date')
                  .withResult('PASS')
                  .build()
              )
              .withRecommendation(
                new SandboxRecommendationBuilder()
                  .withValue('APPROVE')
                  .build()
              )
              .withDocumentFields({
                full_name: 'John Doe',
                nationality: 'GBR',
                date_of_birth: '1986-06-01',
                document_number: '123456789',
              })
              .build()
          )
          .build()
      )
      .withTaskResults(
        new SandboxTaskResultsBuilder()
          .withDocumentTextDataExtractionTask(
            new SandboxDocumentTextDataExtractionTaskBuilder()
              .withDocumentFields({
                full_name: 'John Doe',
                nationality: 'GBR',
                date_of_birth: '1986-06-01',
                document_number: '123456789',
              })
              .build()
          )
          .build()
      )
      .build();

    await this.sandboxClient.configureSessionResponse(sessionId, responseConfig);
  }

  /**
   * Visit app path.
   *
   * @param {string} path
   */
  async visit(path) {
    await this.webDriver.get(`${APP_BASE_URL}${path}`);
    this.window = await this.webDriver.getWindowHandle();
  }

  /**
   * Switch to the Doc Scan iframe.
   */
  async switchToIframe() {
    await this.webDriver.switchTo().frame(0);
  }

  /**
   * Click on HTML element.
   *
   * @param {string} selector
   */
  async clickOn(selector) {
    await this.webDriver.findElement(By.css(selector)).click();
  }

  /**
   * Get visible element text.
   *
   * @param {string} selector
   */
  async getElementText(selector) {
    const element = await this.webDriver.findElement(By.css(selector));
    return element.getText();
  }

  /**
   * Wait for specified number of seconds.
   *
   * @param {int} seconds
   */
  async wait(seconds) { // eslint-disable-line class-methods-use-this
    await new Promise((r) => setTimeout(r, seconds * 1000));
  }

  /**
   * Upload document image.
   */
  async uploadDocument() {
    const uploadElement = await this.webDriver.findElement(By.css("input[data-qa='change-photo']"));
    await uploadElement.sendKeys(DOCUMENT_IMAGE_PATH);
  }
}

setWorldConstructor(World);
setDefaultTimeout(20000);
