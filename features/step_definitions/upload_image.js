const { Given, When } = require('@cucumber/cucumber');

// upload image
Given('image is in format {word}', function (format) {
  this.format = format;
});

When('user drags image into input field', function () {
  this.actualAnswer = isItPNGOrJPEG(this.format);
});


function isItPNGOrJPEG(format) {
  if (format === 'PNG' || format === 'JPEG') {
    return 'progress bar';
  } else {
    return 'warning popup';
  }
}
