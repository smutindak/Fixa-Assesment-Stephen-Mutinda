import { Locator, Page } from "@playwright/test";
import path from 'path';

export class EmployeesPageObject {
    private readonly page: Page;
    private readonly addEmployeeBtn: Locator;
    private readonly specialEmployeeType: Locator;
    private readonly continueBtn: Locator;
    private readonly addEmployeesManually: Locator;
    private readonly passportNumber: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly phoneNumber: Locator;
    private readonly gender: Locator;
    private readonly nationality: Locator;
    private readonly searchNationality: Locator;
    private readonly selectTrade: Locator;
    private readonly plumberTradeOption: Locator;
    private readonly rateSalary: Locator;
    private readonly paymentMethod: Locator;
    private readonly equityBankOption: Locator;
    private readonly accountNumber: Locator;
    private readonly uploadDocumentBtn: Locator;
    private readonly processUploadDocumentBtn: Locator;
    private readonly saveEmployeeBtn: Locator;
    private readonly maleOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addEmployeeBtn = page.getByRole('button', { name: 'Add Employee' });
        this.specialEmployeeType = page.getByRole('button', { name: /special/i });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.addEmployeesManually = page.getByRole('button', { name: 'Add Employee Manually Add' });
        this.passportNumber = page.getByRole('textbox', { name: 'NID/Passport Number' });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Phone Number' });
        this.gender = page.getByRole('combobox');
        this.nationality = page.getByRole('textbox', { name: 'Select nationality' });
        this.searchNationality = page.getByPlaceholder('Search...');
        this.selectTrade = page.getByRole('combobox').filter({ hasText: 'Select trade' });
        this.plumberTradeOption = page.getByLabel('Plumber', { exact: true }).getByText('Plumber');
        this.rateSalary = page.getByRole('textbox', { name: 'Enter rate' });
        this.paymentMethod = page.getByRole('combobox').filter({ hasText: 'Select payment institution' });
        this.equityBankOption = page.getByLabel('Equity Bank', { exact: true }).getByText('Equity Bank');
        this.accountNumber = page.getByRole('textbox', { name: 'Account Number' });
        this.uploadDocumentBtn = page.locator('div').filter({ hasText: /^national idUpload$/ }).getByRole('button');
        this.processUploadDocumentBtn = page.getByRole('button', { name: 'Next' });
        this.saveEmployeeBtn = page.getByRole('button', { name: 'Save Employee' });
        this.maleOption = page.getByRole('option', { name: 'Male', exact: true });

    }


    async createEmployee(passportNum: string, fName: string, lName: string, phoneNum: string, nationalityStr: string, rate: string, accountNum: string,fileName: string) {
        // Click on add employees btn
        await this.addEmployeeBtn.click();

        // Click on special
        await this.specialEmployeeType.click();

        // Click on continue
        await this.continueBtn.click();

        // Click on add employees manually
        await this.addEmployeesManually.click();

        // Key in nationality
        await this.nationality.click();
        await this.searchNationality.fill(nationalityStr);
        await this.searchNationality.press('Enter');

        // Key in ID
        await this.passportNumber.fill(passportNum);

        // Key in first name and last name
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);

        // Clear phone number and key in new value
        await this.phoneNumber.clear();
        await this.phoneNumber.fill(phoneNum);

        // Gender
        await this.gender.click();
        await this.maleOption.click();

        // Click on continue
        await this.continueBtn.click();

        // Key in trade
        await this.selectTrade.click();
        await this.plumberTradeOption.click();

        // Key in rate
        await this.rateSalary.fill(rate);

        // Key in account number
        await this.paymentMethod.click();
        await this.equityBankOption.click();
        await this.accountNumber.fill(accountNum);

        // Click on continue
        await this.continueBtn.click();

        // Upload documents
        await this.uploadDocument(fileName);

        // Click on continue
        await this.continueBtn.click();

        await this.saveEmployeeBtn.click();
    }


    async uploadDocument(fileName) {
        await this.uploadDocumentBtn.click();
        const filePath = path.resolve(fileName);
        await this.page.locator('input[type=\'file\']').setInputFiles(filePath);

        // Click on next
        await this.processUploadDocumentBtn.click();
    }

}
