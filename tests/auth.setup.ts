import test, { expect, test as setup } from '@playwright/test';
import { LoginPageObject } from '../pages/LoginPageObject';
import { authConfig } from '../config/auth.config';

const authFile = '.auth/user.json'

setup('authentication', async ({ page }) => {
    const loginPage = new LoginPageObject(page);

    await test.step('Login to application', async () => {
        await page.goto('./');

        await loginPage.login({
            email: authConfig.username,
            password: authConfig.password
        });
        // No need to wait for URL as it's handled in the LoginPageObject
        expect(await loginPage.isLoggedIn(), 'User should be logged in').toBe(true);

        await page.context().storageState({ path: authFile });
        console.log('✓ Authentication state saved successfully');
    });
});