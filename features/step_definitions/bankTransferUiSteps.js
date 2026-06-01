const { expect } = require('chai');
const { After, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { getConfig } = require('../support/bankApiClient');

setDefaultTimeout(30000);

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('the bank web app is open', async function () {
  await openWebApp(this);
});

Given('I am logged in on the bank web app', async function () {
  await openWebApp(this);
  await loginOnWebApp(this, getConfig().password);
  await waitForTransferForm(this.page);
});

When('I log in on the web app with valid credentials', async function () {
  await loginOnWebApp(this, getConfig().password);
});

When('I log in on the web app with invalid credentials', async function () {
  await loginOnWebApp(this, 'invalid-password');
});

When('I submit a transfer through the web app', async function () {
  const { transfer } = getConfig();

  this.submittedTransferAmount = Number(process.env.BANK_UI_TRANSFER_AMOUNT || 123.45);

  await submitTransfer(this.page, {
    ...transfer,
    valor: this.submittedTransferAmount
  });
});

Then('the transfer form should be displayed', async function () {
  await waitForTransferForm(this.page);
});

Then('the bank accounts should be available in the transfer form', async function () {
  const accountOptionsCount = await this.page.locator('#conta-origem option').count();

  expect(accountOptionsCount).to.be.greaterThan(1);
});

Then('the web app should show a login error', async function () {
  await waitForToast(this.page, 'Erro no login');
});

Then('the web app should show transfer success', async function () {
  await waitForToast(this.page, 'Transferência realizada!');
});

Then('the transfer list should show the submitted transfer', async function () {
  const expectedAmount = formatCurrencyAmount(this.submittedTransferAmount);

  await this.page.waitForFunction(
    (amount) => {
      const items = Array.from(document.querySelectorAll('#transferencias-list .collection-item'));

      return items.some((item) => item.textContent.includes(amount));
    },
    expectedAmount
  );
});

async function openWebApp(world) {
  const browser = await launchBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  const webBaseUrl = process.env.WEB_BASE_URL || 'http://localhost:4000';

  world.browser = browser;
  world.context = context;
  world.page = page;

  await page.goto(webBaseUrl);
  await page.waitForSelector('#login-section');
}

async function launchBrowser() {
  const headless = process.env.HEADLESS !== 'false';
  const channel = process.env.PLAYWRIGHT_CHANNEL || 'chrome';

  try {
    return await chromium.launch({ channel, headless });
  } catch (error) {
    if (process.env.PLAYWRIGHT_CHANNEL) {
      throw error;
    }

    return chromium.launch({ headless });
  }
}

async function loginOnWebApp(world, password) {
  const { username } = getConfig();

  await world.page.fill('#username', username);
  await world.page.fill('#senha', password);
  await world.page.click('button:has-text("Entrar")');
}

async function waitForTransferForm(page) {
  await page.waitForSelector('#app-section:not(.hidden)');
  await page.waitForSelector('#valor');
  await page.waitForFunction(() => {
    const originOptions = document.querySelectorAll('#conta-origem option');
    const targetOptions = document.querySelectorAll('#conta-destino option');

    return originOptions.length > 1 && targetOptions.length > 1;
  });
}

async function submitTransfer(page, transfer) {
  await page.evaluate((selectedTransfer) => {
    setSelectValue('#conta-origem', selectedTransfer.contaOrigem);
    setSelectValue('#conta-destino', selectedTransfer.contaDestino);

    function setSelectValue(selector, value) {
      const select = document.querySelector(selector);

      select.value = String(value);
      select.dispatchEvent(new Event('change', { bubbles: true }));

      if (window.M) {
        window.M.FormSelect.init(select);
      }
    }
  }, transfer);
  await page.fill('#valor', String(transfer.valor));
  await page.click('button:has-text("Transferir")');
}

async function waitForToast(page, expectedText) {
  await page.waitForFunction(
    (text) => {
      const toasts = Array.from(document.querySelectorAll('.toast'));

      return toasts.some((toast) => toast.textContent.includes(text));
    },
    expectedText
  );
}

function formatCurrencyAmount(amount) {
  return Number(amount).toFixed(2);
}
