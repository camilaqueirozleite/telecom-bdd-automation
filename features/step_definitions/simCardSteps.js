const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');
const { activateSimCard } = require('../support/telecomApiClient');

Given('the telecom API is available', function () {
  console.log('Telecom API is available');
});

When('I activate a SIM card with valid customer data', async function () {
  console.log('Activating SIM card');

  this.activationResponse = await activateSimCard({
    customerId: 'customer-123',
    iccid: '8955512345678901234'
  });
});

When('I activate a SIM card with invalid customer data', async function () {
  console.log('Activating SIM card with invalid customer data');

  this.activationResponse = await activateSimCard({
    customerId: '',
    iccid: ''
  });
});

Then('the activation should be completed successfully', function () {
  expect(this.activationResponse).to.exist;
  console.log('Activation completed successfully');
});

Then('the activation should fail', function () {
  expect(this.activationResponse).to.exist;
  expect(this.activationResponse.status).to.be.at.least(400);
});

Then('the API should return status {int}', function (expectedStatusCode) {
  expect(this.activationResponse.status).to.equal(expectedStatusCode);
});

Then('the activation message should be displayed', function () {
  expect(this.activationResponse.message).to.equal('SIM card activated successfully');
});

Then('the error message should be displayed', function () {
  expect(this.activationResponse.message).to.equal('Invalid customer data');
});

