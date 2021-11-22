const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('image is in format {word}', function (format) {
  this.format = format;
});

Given('image has successfully been converted to low poly art', function () {
  this.success = true;
});

Given('image has not successfully been converted to low poly art', function () {
  this.success = false;
});

Given('a image is uploaded to the server', function () {
  this.uploaded = true;
});

Given('a image has been manipulated', function () {
  this.manipulated = true;
});

Given('no image is uploaded to the server', function () {
  this.uploaded = false;
});

Given('the image has not been manipulated', function () {
  this.manipulated = false;
});

When('user chooses action convert to low poly art', function () {
  this.actualAnswer = isSuccessful(this.success);
});

When('user presses download button', function () {
  this.actualAnswer = isDownloaded(this.uploaded, this.manipulated);
});

Then('user should see a {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
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

// IG Pano Split
Given('upladed image has at least a width of {word}', function (width) {
  this.width = width;
});

Given('image has sucessfully been split into images with a width of {word}', function () {
  this.success = true;
});

Given('image has not successfully been split into images with a width of {word}', function () {
  this.success = false;
});

When('user chooses action Instagram split panorame image', function () {
  this.actualAnswer = isSuccessful(this.success);
});

When('user drags image in into input field', function () {
  this.actualAnswer = isItWiderThan1048576Pixels(this.format);
});

// convert to/from JPEG
Given('image has successfully been converted to {word}', function () {
  this.success = true;
});

Given('image has not successfully been converted to {word}', function () {
  this.success = false;
});

When('user chooses action convert to/from jpeg', function () {
  this.actualAnswer = isSuccessful(this.success);
});

When('user drags image into input field', function () {
  this.actualAnswer = isItPNGOrJPEG(this.format);
});

// functions
function isSuccessful(success) {
  if (success === true) {
    return 'success message';
  } else {
    return 'warning message';
  }
}

function isItPNGOrJPEG(format) {
  if (format === 'PNG' || format === 'JPEG') {
    return 'progress bar';
  } else {
    return 'warning popup';
  }
}

function isDownloaded(uploaded, manipulated) {
  if (uploaded === true && manipulated === true) {
    return 'downloaded successfully';
  } else {
    return 'failed to download image';
  }
}

function isItWiderThan1048576Pixels(width) {
  if (width >= 1048576) {
      return 'progress bar';
  } else {
      return 'warning popup';
  }
}
