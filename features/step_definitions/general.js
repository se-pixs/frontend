const assert = require('assert');
const { Then } = require('@cucumber/cucumber');

// Note: this file only contains a single statement as it is used to 
// out source statements that are used more than once for the use cases.
// Thereofore, changes can be made at a single point in code, rather 
// than at various lines in the cucumber code. 

Then('user should see a {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});
