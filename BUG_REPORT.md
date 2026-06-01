# Bug Report - Empty BFF Error Does Not Show Feedback In Web UI

## Summary

The Web UI does not show an error message when an invalid transfer request returns an error response with an empty body from the BFF.

## ID

`BUG-001`

## Severity

Medium

## Priority

Medium

## Environment

```text
API / Swagger: http://localhost:3000/api-docs/
Frontend:      http://localhost:4000/
Browser:       Chrome / Playwright Chromium
```

## Preconditions

- API is running on `http://localhost:3000`.
- Frontend is running on `http://localhost:4000`.
- User is logged in with valid credentials.
- Source and target accounts are loaded in the transfer form.

## Steps To Reproduce

1. Open `http://localhost:4000`.
2. Log in with valid credentials.
3. Select a valid source account.
4. Select a valid target account.
5. Fill the transfer amount with an invalid value, such as `0`.
6. Click `Transferir`.

## Expected Result

The application should display a clear error message to the user, for example:

```text
Erro na transferencia.
```

or a specific validation message returned by the API.

## Actual Result

No visible toast or error message is displayed when the BFF returns an error response with an empty body.

## Technical Observation

The frontend error flow tries to parse the error response as JSON:

```javascript
const data = await response.json();
M.toast({ html: data.error || 'Erro na transferencia.', classes: 'red' });
```

When the response body is empty, `response.json()` fails before the fallback message can be shown.

## Impact

- The user does not receive feedback about why the transfer failed.
- The interface appears unresponsive or unreliable.
- Automated UI validation for invalid transfer feedback cannot be safely enabled until this behavior is fixed.

## Suggested Fix

Handle empty error responses before parsing JSON.

Example approach:

```javascript
let errorMessage = 'Erro na transferencia.';

try {
  const data = await response.json();
  errorMessage = data.error || errorMessage;
} catch {
  // Keep fallback message when the response body is empty or invalid JSON.
}

M.toast({ html: errorMessage, classes: 'red' });
```

## Status

Open.
