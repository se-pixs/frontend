const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

// IG Pano Split
Given('image has sucessfully been split into smaller images', function () {
  this.success = true;
});

Given('image has not sucessfully been split into smaller images', function () {
  this.success = false;
});


When('user chooses action split original image into smaller images', function () {
  this.actualAnswer = isSuccessful(this.success);
});

When('user drags image in into input field', function () {
  this.actualAnswer = isItWiderThan1048576Pixels(this.format);
});


function isSuccessful(success) {
  if (success === true) {
    return 'success message';
  } else {
    return 'warning message';
  }
}

function isItWiderThan1048576Pixels(width) {
  if (width >= 1048576) {
    return 'progress bar';
  } else {
    return 'warning popup';
  }
}