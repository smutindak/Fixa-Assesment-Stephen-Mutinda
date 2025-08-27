import { expect, test } from '@playwright/test';
import { LoginPageObject } from '../pages/LoginPageObject';
import { EmployeesPageObject } from '../pages/EmployeesPageObject';
import { faker } from '@faker-js/faker';
import { authConfig } from '../config/auth.config';

// Navigate to login page 
test.beforeEach(async ({ page }) => {
  await page.goto('./');
})

test('Setup employee successfully', async ({ page }) => {
  // Login to application
  const loginPage = new LoginPageObject(page);
  await loginPage.login(authConfig.username, authConfig.password);

  // Wait until redirected to onboarding
  await page.waitForURL('**/onboarding');

  const employeesPage = new EmployeesPageObject(page);

  // Navigate to employee page
  await employeesPage.navigateToEmployeesPage();

  // Fill in employee details
  const employeeData = {
    passportNum: generateRandomID(8),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNum: generatePhoneNumber(),
    nationality: 'Kenya',
    rate: '500',
    accountNum: '00145628',
    fileName: 'FixaUpload.pdf',
    gender: 'Female'
  };

  // Wait for the specific bulk employee creation endpoint
  const responsePromise = page.waitForResponse('**/api/v1/employees/bulk');
  
  await employeesPage.createEmployee(employeeData);

  // Get the API response
  const response = await responsePromise;
  const responseData = await response.json();

  // Get employee details from the response
  const employeeDetails = responseData.data[0].employee;
  const employeeFirstName = employeeDetails.firstName;

  // Assert that employee was created successfully
  expect(responseData.data[0].saveStatus).toBe('success');
  expect(responseData.message).toBe('Success');
  expect(employeeFirstName).toBe(employeeData.firstName);
});


function generatePhoneNumber() {
  const prefix = '2547';
  const totalLength = 12;
  const remainingLength = totalLength - prefix.length;

  let number = '';
  for (let i = 0; i < remainingLength; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return prefix + number;
}

function generateRandomID(length = 8) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += Math.floor(Math.random() * 10); // generates 0-9
  }
  return id;
}