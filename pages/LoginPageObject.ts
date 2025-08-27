import { Locator, Page } from "@playwright/test";

export class LoginPageObject{
    private readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddressInput =  page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login to Fixa' });
    }

    async login(email: string, password: string) {
        await this.emailAddressInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

}