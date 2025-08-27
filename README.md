# Fixa HR Automation Project

This project contains automated tests for the Fixa HR application using Playwright Test Framework.

## Prerequisites

Before running the tests, make sure you have the following installed:
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/smutindak/Fixa-Assesment-Stephen-Mutinda.git
cd Fixa-Assesment-Stephen-Mutinda
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Configure environment variables:
Create a `.env` file in the root directory of the project and add your login credentials:

```bash
# Create .env file
touch .env
```

Add the following content to the `.env` file:
```env
FIXA_USERNAME=yourEmailAddress
FIXA_PASSWORD=yourPassword
```


## Project Structure

```
├── pages/                    # Page Object Models
│   ├── EmployeesPageObject.ts
│   └── LoginPageObject.ts
├── tests/                    # Test Specifications
│   ├── EmployeesTestCase.spec.ts
│   └── example.spec.ts
├── playwright.config.ts      # Playwright Configuration
├── .env                      # Environment variables (not committed)
└── FixaUpload.pdf           # Test Data
```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/EmployeesTestCase.spec.ts
```

To run tests in headed mode (with browser visible):
```bash
npx playwright test --headed
```

To run tests in debug mode:
```bash
npx playwright test --debug
```

## Test Reports

After test execution, HTML reports are generated in the `playwright-report` directory. To view the report:
```bash
npx playwright show-report
```

## Environment Configuration

The tests use environment variables for authentication. Make sure your `.env` file contains:

- `FIXA_USERNAME`: Your Fixa HR login email
- `FIXA_PASSWORD`: Your Fixa HR login password

These credentials will be automatically loaded by the test framework for authentication during test execution.

## Features Tested

- User Authentication
- Employee Management
  - Creating new employees
  - File upload functionality
  - Form validation

## Additional Notes

- The tests are configured to run against the staging environment (`https://app.staging.fixahr.com`)
- Test data includes sample employee information and PDF documents for upload testing
- Phone numbers are automatically generated for unique employee creation