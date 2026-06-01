const fs = require('fs');
const path = require('path');

const DEFAULT_API_BASE_URL = 'http://localhost:3000';

loadEnvFile();

function getConfig() {
  const username = process.env.BANK_API_USERNAME;
  const password = process.env.BANK_API_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Set BANK_API_USERNAME and BANK_API_PASSWORD before running the API tests.'
    );
  }

  return {
    baseUrl: process.env.API_BASE_URL || DEFAULT_API_BASE_URL,
    username,
    password,
    transfer: {
      contaOrigem: Number(process.env.BANK_SOURCE_ACCOUNT_ID || 1),
      contaDestino: Number(process.env.BANK_TARGET_ACCOUNT_ID || 2),
      valor: Number(process.env.BANK_TRANSFER_AMOUNT || 100)
    }
  };
}

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = unquote(value);
    }
  }
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

async function checkApiAvailability() {
  const { baseUrl } = getConfig();

  return request(`${baseUrl}/api-docs/`);
}

async function login(username, password) {
  const { baseUrl } = getConfig();

  return request(`${baseUrl}/login`, {
    method: 'POST',
    body: {
      username,
      senha: password
    }
  });
}

async function listAccounts(token) {
  const { baseUrl } = getConfig();

  return request(`${baseUrl}/contas?page=1&limit=10`, {
    token
  });
}

async function createTransfer(token, transfer) {
  const { baseUrl } = getConfig();

  return request(`${baseUrl}/transferencias`, {
    method: 'POST',
    token,
    body: transfer
  });
}

async function request(url, options = {}) {
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is not available. Use Node.js 18 or newer.');
  }

  const headers = {};

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  return {
    status: response.status,
    body: await parseJson(response)
  };
}

async function parseJson(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

module.exports = {
  checkApiAvailability,
  createTransfer,
  getConfig,
  listAccounts,
  login
};
