# Test Plan - Bank Transfer BDD Automation

## Objective

Validate the main business flows of a bank transfer application through automated BDD tests covering API and Web UI layers.

## Application Under Test

This project tests a local mentorship application that must be running before test execution.

```text
API / Swagger: http://localhost:3000/api-docs/
Frontend:      http://localhost:4000/
```

## Test Scope

In scope:

- User login through API.
- Rejection of invalid login credentials through API.
- Authenticated bank account listing through API.
- Bank transfer creation through API.
- Authentication validation for protected API routes.
- Business validation for invalid transfer amount through API.
- Web login with valid credentials.
- Web login with invalid credentials.
- Account loading in the web transfer form.
- Transfer creation through the web interface.

Out of scope:

- Performance testing.
- Security testing beyond basic authentication validation.
- Database validation.
- Cross-browser testing beyond the configured Playwright browser.
- CI execution, because the API and frontend run only on the local mentorship environment.

## Test Types

- Functional API testing.
- Functional Web UI testing.
- Regression testing.
- BDD acceptance testing.
- Basic negative testing.

## Tools

- Cucumber.js for BDD scenarios.
- Chai for assertions.
- Playwright for Web UI automation.
- Node.js and npm for execution.
- Cucumber HTML formatter for reports.

## Environment

```text
API_BASE_URL=http://localhost:3000
WEB_BASE_URL=http://localhost:4000
```

Required services:

- API running locally on port `3000`.
- Frontend running locally on port `4000`.

## Test Data

The test data is configured through environment variables or a local `.env` file.

```text
BANK_API_USERNAME
BANK_API_PASSWORD
BANK_SOURCE_ACCOUNT_ID
BANK_TARGET_ACCOUNT_ID
BANK_TRANSFER_AMOUNT
BANK_UI_TRANSFER_AMOUNT
```

Sensitive data must not be committed to GitHub. The repository provides only `.env.example`.

## Entry Criteria

- Node.js and npm installed.
- Project dependencies installed with `npm install`.
- API available at `http://localhost:3000`.
- Swagger available at `http://localhost:3000/api-docs/`.
- Frontend available at `http://localhost:4000`.
- Valid test user configured locally.
- Source and target accounts available for transfer.

## Exit Criteria

- All API scenarios pass.
- All Web UI scenarios pass.
- Cucumber HTML report can be generated.
- Any defect found is documented with steps, expected result, actual result, and impact.

## Automated Scenarios

| ID | Layer | Scenario | Expected Result |
| --- | --- | --- | --- |
| API-001 | API | Login successfully | Status `200` and JWT token returned |
| API-002 | API | Reject login with invalid credentials | Status `401` |
| API-003 | API | List bank accounts with authentication | Status `200` and accounts list returned |
| API-004 | API | Create bank transfer successfully | Status `201` and success message returned |
| API-005 | API | Reject transfer without authentication | Status `401` |
| API-006 | API | Reject transfer with invalid amount | Status `422` |
| UI-001 | Web UI | Login successfully on the web app | Transfer form displayed |
| UI-002 | Web UI | Reject login with invalid credentials | Login error toast displayed |
| UI-003 | Web UI | Create a transfer through the web app | Success toast displayed and transfer listed |

## Execution Commands

Run all scenarios:

```bash
npm test
```

Run only API scenarios:

```bash
npm run test:api
```

Run only Web UI scenarios:

```bash
npm run test:ui
```

Generate HTML report:

```bash
npm run test:report
```

## Expected Result

```text
9 scenarios (9 passed)
35 steps (35 passed)
```

## Risks And Observations

- The API and frontend are local mentorship services, so GitHub Actions cannot run the suite unless those services are also started in CI.
- Successful transfer scenarios create real records in the local application and may change account balances.
- A Web UI defect was found for invalid transfer errors. See `BUG_REPORT.md`.
