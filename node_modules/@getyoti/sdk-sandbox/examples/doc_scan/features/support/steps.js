/* eslint-disable func-names */
const { Given, Then } = require('cucumber');
const expect = require('expect');

Given('I am on {string}', async function (path) {
  await this.visit(path);
});

Given('I configure the session response', async function () {
  await this.configureSessionResponse();
});

Given('I click on {string}', async function (text) {
  await this.clickOn(text);
});

Given('I switch to the iframe', async function () {
  await this.switchToIframe();
});

Given('I upload a document', async function () {
  await this.uploadDocument();
});

Given('I choose {string}', async function (value) {
  await this.clickOn(`input[value='${value}']`);
});

Given('I click on add photo button', async function () {
  await this.clickOn("*[data-qa='addPhotoButton']");
});

Given('I click on finish button', async function () {
  await this.clickOn("*[data-qa='finish-button']");
});

Then('I wait {int} second(s)', async function (seconds) {
  await this.wait(seconds);
});

Then('the authenticity check breakdown sub check should be {string}', async function (subCheck) {
  const text = await this.getElementText("*[data-qa='authenticity-checks'] *[data-qa='sub-check']");
  expect(text).toContain(subCheck);
});

Then('the authenticity check breakdown result should be {string}', async function (result) {
  const text = await this.getElementText("*[data-qa='authenticity-checks'] *[data-qa='result']");
  expect(text).toContain(result);
});

Then('the text data check breakdown sub check should be {string}', async function (subCheck) {
  const text = await this.getElementText("*[data-qa='text-data-checks'] *[data-qa='sub-check']");
  expect(text).toContain(subCheck);
});

Then('the text data check breakdown result should be {string}', async function (result) {
  const text = await this.getElementText("*[data-qa='text-data-checks'] *[data-qa='result']");
  expect(text).toContain(result);
});

Then('I should see {string}', async function (text) {
  const source = await this.webDriver.getPageSource();
  expect(source).toContain(text);
});
