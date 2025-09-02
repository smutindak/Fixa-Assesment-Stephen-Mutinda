import { Locator, Page, expect } from "@playwright/test";

export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Page Object Model for the Login page
 * Handles authentication-related actions and validations
 */
export class LoginPageObject {
    private readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // More specific selectors with better accessibility
        this.emailAddressInput = page.getByRole('textbox', { name: '* Username' });
        this.passwordInput = page.getByRole('textbox', { name: '* Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login to Fixa', exact: true });
        this.errorMessage = page.getByRole('alert');
    }

    /**
     * Performs the login operation with the provided credentials
     * @param credentials Object containing email and password
     * @returns Promise that resolves when login is complete
     * @throws Error if credentials are invalid or login fails
     */
    async login(credentials: LoginCredentials): Promise<void> {
        // Block Tawk.to before anything else
        await this.preventTawkToWidget();

        await this.fillLoginForm(credentials);
        await this.submitLogin();
    }


    /**
     * Fills in the login form with provided credentials
     * @param credentials Object containing email and password
     */
    private async fillLoginForm(credentials: LoginCredentials): Promise<void> {
        // Clear any existing values
        await this.emailAddressInput.clear();
        await this.passwordInput.clear();

        // Fill in credentials with typing animation
        await this.emailAddressInput.pressSequentially(credentials.email, { delay: 100 });
        await this.passwordInput.pressSequentially(credentials.password, { delay: 100 });
    }

    /**
     * Submits the login form
     */
    private async submitLogin(): Promise<void> {
        await this.loginBtn.click();
    }

    /**
     * Checks if user is logged in
     * @returns Promise<boolean> true if user is logged in
     */
    async isLoggedIn(): Promise<boolean> {
        try {
            // Wait for an element that's only visible when logged in
            await this.page.waitForURL('**/onboarding', { timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Prevents Tawk.to chat widget from loading
     */
    async preventTawkToWidget(): Promise<void> {
        // Block Tawk.to scripts and resources
        await this.page.route('**/*.tawk.to/**', route => route.abort());

        // Prevent Tawk.to widget from initializing
        await this.page.addInitScript(() => {
            Object.defineProperty(window, 'Tawk_API', {
                get: () => undefined,
                set: () => { }
            });
            Object.defineProperty(window, 'Tawk_LoadStart', {
                get: () => undefined,
                set: () => { }
            });
        });
    }
}