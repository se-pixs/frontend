const { Given, When } = require('@cucumber/cucumber');

// convert to low poly
Given('image has successfully been converted to low poly art', function () {
  this.success = true;
});

Given('image has not successfully been converted to low poly art', function () {
  this.success = false;
});

When('user chooses action convert to low poly art', function () {
  this.actualAnswer = isSuccessful(this.success);
});


function isSuccessful(success) {
  if (success === true) {
    return 'success message';
  } else {
    return 'warning message';
  }
}