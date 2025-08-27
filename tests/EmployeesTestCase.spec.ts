import { expect, test } from '@playwright/test';
import { LoginPageObject } from '../pages/LoginPageObject';
import { EmployeesPageObject } from '../pages/EmployeesPageObject';

// Navigate to login page 
test.beforeEach(async ({ page }) => {
    await page.goto('./');
})

test('Setup employee successfully', async ({ page }) => {
    // Login to application
    const loginPage = new LoginPageObject(page);
    await loginPage.login('tafara@fixarwanda.com', '0784526338Mit2@');

    // Wait until redirected to onboarding
    await page.waitForURL('**/onboarding');

    // Navigate to employee page
    await page.goto('https://app.staging.fixahr.com/employees?page=1&perPage=10');

    // Fill in employee details
     const randomPhone = generatePhoneNumber();
    const employeesPage = new EmployeesPageObject(page);
    await employeesPage.createEmployee('298745', 'John123', 'Doe', randomPhone, 'Kenya', '500', '254711358114', 'FixaUpload.pdf');
});


function generatePhoneNumber() {
  const prefix = '254';
  const totalLength = 12;
  const remainingLength = totalLength - prefix.length;

  let number = '';
  for (let i = 0; i < remainingLength; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return prefix + number;
}