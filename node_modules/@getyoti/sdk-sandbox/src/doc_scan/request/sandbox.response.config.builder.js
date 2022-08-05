'use strict';

const { Validation } = require('../../util');
const SandboxTaskResults = require('./sandbox.task.results');
const SandboxCheckReports = require('./sandbox.check.reports');
const SandboxResponseConfig = require('./sandbox.response.config');

class SandboxResponseConfigBuilder {
  /**
   * @param {SandboxTaskResults} taskResults
   */
  withTaskResults(taskResults) {
    Validation.instanceOf(taskResults, SandboxTaskResults, 'taskResults');
    this.taskResults = taskResults;
    return this;
  }

  /**
   * @param {SandboxCheckReports} checkReports
   */
  withCheckReports(checkReports) {
    Validation.instanceOf(checkReports, SandboxCheckReports, 'checkReports');
    this.checkReports = checkReports;
    return this;
  }

  /**
   * @returns {SandboxResponseConfig}
   */
  build() {
    return new SandboxResponseConfig(this.taskResults, this.checkReports);
  }
}

module.exports = SandboxResponseConfigBuilder;
