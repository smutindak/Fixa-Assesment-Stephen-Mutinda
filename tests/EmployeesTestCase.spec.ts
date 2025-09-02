import { expect, test } from '@playwright/test';
import { EmployeesPageObject } from '../pages/EmployeesPageObject';
import { TestDataGenerator } from '../utils/testData';
import { LoginPageObject } from '../pages/LoginPageObject';

test.describe('Employee Management', () => {
    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('./');
        });

        // Disable chat widget
        const loginPage = new LoginPageObject(page);
        await loginPage.preventTawkToWidget();
    });

    test('Create new employee successfully', async ({ page }) => {
        const employeesPage = new EmployeesPageObject(page);
        const employeeData = TestDataGenerator.generateEmployeeData();

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
            expect(employeeDetails.firstName, 'Created employee should have correct first name').toBe(employeeData.firstName);
        });
    });

    test('Create new employee successfully-Simulate-Using-Same-AuthenticationState-WithoutLoggingIn-EveryTest', async ({ page }) => {
        const employeesPage = new EmployeesPageObject(page);
        const employeeData = TestDataGenerator.generateEmployeeData();

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
            expect(employeeDetails.firstName, 'Created employee should have correct first name').toBe(employeeData.firstName);
        });
    });
});