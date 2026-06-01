const { expect } = require('chai');
const { Given, When, Then } = require('@cucumber/cucumber');
const {
  checkApiAvailability,
  createTransfer,
  getConfig,
  listAccounts,
  login
} = require('../support/bankApiClient');

Given('the banking API is available', async function () {
  this.apiResponse = await checkApiAvailability();

  expect(this.apiResponse.status).to.equal(200);
});

Given('I am authenticated', async function () {
  const { username, password } = getConfig();

  this.apiResponse = await login(username, password);
  this.authToken = this.apiResponse.body.token;

  expect(this.apiResponse.status).to.equal(200);
  expect(this.authToken).to.be.a('string').and.not.be.empty;
});

When('I log in with valid credentials', async function () {
  const { username, password } = getConfig();

  this.apiResponse = await login(username, password);
});

When('I log in with invalid credentials', async function () {
  const { username } = getConfig();

  this.apiResponse = await login(username, 'invalid-password');
});

When('I request the bank accounts', async function () {
  this.apiResponse = await listAccounts(this.authToken);
});

When('I create a bank transfer with valid data', async function () {
  const { transfer } = getConfig();

  this.apiResponse = await createTransfer(this.authToken, transfer);
});

When('I create a bank transfer without authentication', async function () {
  const { transfer } = getConfig();

  this.apiResponse = await createTransfer(null, transfer);
});

When('I create a bank transfer with invalid amount', async function () {
  const { transfer } = getConfig();

  this.apiResponse = await createTransfer(this.authToken, {
    ...transfer,
    valor: 0
  });
});

Then('the API should return status {int}', function (expectedStatusCode) {
  expect(this.apiResponse.status).to.equal(expectedStatusCode);
});

Then('a JWT token should be returned', function () {
  expect(this.apiResponse.body.token).to.be.a('string').and.not.be.empty;
});

Then('the accounts list should be returned', function () {
  expect(this.apiResponse.body.contas).to.be.an('array').and.not.be.empty;
});

Then('the transfer success message should be returned', function () {
  expect(this.apiResponse.body.message).to.equal('Transferência realizada com sucesso.');
});
