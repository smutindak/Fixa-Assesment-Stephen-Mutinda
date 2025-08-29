# Fixa HR Automation Project

This project contains automated tests for the Fixa HR application using Playwright Test Framework.

## Prerequisites

Before running the tests, make sure you have one of the following setups:

### Option 1: Local Setup
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Option 2: Docker Setup
- Docker installed on your system
  - [Install Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Install Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Install Docker for Linux](https://docs.docker.com/engine/install/)

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

### Option 1: Running Tests Locally

#### Windows
```powershell
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/EmployeesTestCase.spec.ts

# Run in headed mode (browser visible)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
```

#### MacOS/Linux
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/EmployeesTestCase.spec.ts

# Run in headed mode (browser visible)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug
```

### Option 2: Running Tests with Docker

#### Windows (PowerShell)
```powershell
docker run --rm -v ${PWD}:/app -w /app --ipc=host --network host mcr.microsoft.com/playwright:v1.55.0-jammy /bin/bash -c "npm ci && npx playwright test"
```

#### MacOS/Linux
```bash
docker run --rm -v $(pwd):/app -w /app --ipc=host --network host mcr.microsoft.com/playwright:v1.55.0-jammy /bin/bash -c "npm ci && npx playwright test"
```

For headed mode testing in Docker, additional configuration may be required for display forwarding.

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