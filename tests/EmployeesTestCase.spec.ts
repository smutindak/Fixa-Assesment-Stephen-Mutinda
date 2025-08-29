import { expect, test } from '@playwright/test';
import { LoginPageObject } from '../pages/LoginPageObject';
import { EmployeesPageObject } from '../pages/EmployeesPageObject';
import { authConfig } from '../config/auth.config';
import { TestDataGenerator } from '../utils/testData';

test.describe('Employee Management', () => {
    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('./');
        });
    });

    test('Create new employee successfully', async ({ page }) => {
        const loginPage = new LoginPageObject(page);
        const employeesPage = new EmployeesPageObject(page);
        const employeeData = TestDataGenerator.generateEmployeeData();

        await test.step('Login to application', async () => {
            await loginPage.login({
                email: authConfig.username,
                password: authConfig.password
            });
            // No need to wait for URL as it's handled in the LoginPageObject
            expect(await loginPage.isLoggedIn(), 'User should be logged in').toBe(true);
        });

        await test.step('Navigate to employees page', async () => {
            await employeesPage.navigateToEmployeesPage();
        });

        await test.step('Create new employee', async () => {
            const responsePromise = page.waitForResponse('**/api/v1/employees/bulk');
            await employeesPage.createEmployee(employeeData);

            const response = await responsePromise;
            const responseData = await response.json();
            const employeeDetails = responseData.data[0].employee;

            expect(responseData.data[0].saveStatus, 'Employee should be created successfully').toBe('success');
            expect(responseData.message, 'API should return success message').toBe('Success');
            expect(employeeDetails.firstName, 'Created employee should have correct first name').toBe('FailTestIntentionally');
        });
    });
});