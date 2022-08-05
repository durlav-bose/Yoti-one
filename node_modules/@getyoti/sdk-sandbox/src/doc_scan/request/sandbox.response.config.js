'use strict';

const { Validation } = require('../../util');
const SandboxTaskResults = require('./sandbox.task.results');
const SandboxCheckReports = require('./sandbox.check.reports');

class SandboxResponseConfig {
  /**
   * @param {SandboxTaskResults} taskResults
   * @param {SandboxCheckReports} checkReports
   */
  constructor(taskResults, checkReports) {
    if (taskResults) {
      Validation.instanceOf(taskResults, SandboxTaskResults, 'taskResults');
      this.taskResults = taskResults;
    }

    Validation.instanceOf(checkReports, SandboxCheckReports, 'checkReport');
    this.checkReports = checkReports;
  }

  toJSON() {
    return {
      task_results: this.taskResults,
      check_reports: this.checkReports,
    };
  }
}

module.exports = SandboxResponseConfig;
