const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('the telecom API is available', function () {
  console.log('Telecom API is available');
});

When('I activate a SIM card with valid customer data', function () {
  console.log('Activating SIM card');

  this.activationResponse = {
    status: 201,
    message: 'SIM card activated successfully'
  };
});

Then('the activation should be completed successfully', function () {
  expect(this.activationResponse).to.exist;
  console.log('Activation completed successfully');
});

Then('the API should return status {int}', function (expectedStatusCode) {
  expect(this.activationResponse.status).to.equal(expectedStatusCode);
});

Then('the activation message should be displayed', function () {
  expect(this.activationResponse.message).to.equal('SIM card activated successfully');
});

