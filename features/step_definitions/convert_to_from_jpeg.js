const { Given, When } = require('@cucumber/cucumber');

// convert to/from JPEG
Given('image has successfully been converted to or from jpeg', function () {
  this.success = true;
});

Given('image has not successfully been converted to or from jpeg', function () {
  this.success = false;
});

When('user chooses action convert to or from jpeg', function () {
  this.actualAnswer = isSuccessful(this.success);
});


function isSuccessful(success) {
  if (success === true) {
    return 'success message';
  } else {
    return 'warning message';
  }
}