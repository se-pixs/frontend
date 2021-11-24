const assert = require('assert');
const { Then } = require('@cucumber/cucumber');

Then('user should see a {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});