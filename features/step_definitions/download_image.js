const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('an image is uploaded to the server', function () {
  this.uploaded = true;
});

Given('an image has been manipulated', function () {
  this.manipulated = true;
});

Given('no image is uploaded to the server', function () {
  this.uploaded = false;
});

Given('the image has not been manipulated', function () {
  this.manipulated = false;
});

When('user presses download button', function () {
  this.actualAnswer = isDownloaded(this.uploaded, this.manipulated);
});



Then('user should not be able to download the image successfully', function () {
  assert.equal(this.actualAnswer, 'failed to download image');
});

Then('user should be able to download the image successfully', function () {
  assert.equal(this.actualAnswer, 'downloaded successfully');
});

Then('user should see message {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});

function isDownloaded(uploaded, manipulated) {
  if (uploaded === true && manipulated === true) {
    return 'downloaded successfully';
  } else {
    return 'failed to download image';
  }
}