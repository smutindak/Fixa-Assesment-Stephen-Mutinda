import { Locator, Page } from "@playwright/test";
import path from 'path';

export interface EmployeeData {
    passportNum: string;
    firstName: string;
    lastName: string;
    phoneNum: string;
    nationality: string;
    rate: string;
    accountNum: string;
    fileName: string;
    gender: string;
}

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
    private readonly genderDropDown: Locator;
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
    private readonly employeesSection: Locator;

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
        this.genderDropDown = page.locator('text=Select Gender');
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
        this.employeesSection = page.getByRole('link', { name: 'Employees' });

    }


    /**
     * Creates a new employee with the provided details
     * @param employee Employee data containing all required information
     */
    async createEmployee(employee: EmployeeData) {
        await this.initiateEmployeeCreation();
        await this.fillPersonalInformation(employee);
        await this.selectTradeAndRate(employee.rate);
        await this.setupPaymentInformation(employee.accountNum);
        await this.uploadDocument(employee.fileName);
        await this.finalizeEmployeeCreation();
    }

    /**
     * Initiates the employee creation process by navigating through initial screens
     */
    private async initiateEmployeeCreation() {
        await this.addEmployeeBtn.click();
        await this.specialEmployeeType.click();
        await this.continueBtn.click();
        await this.addEmployeesManually.click();
    }

    /**
     * Fills in the personal information section of the employee form
     * @param employee Employee data containing personal details
     */
    private async fillPersonalInformation(employee: EmployeeData) {
        // Fill nationality
        await this.nationality.click();
        await this.searchNationality.fill(employee.nationality);
        await this.searchNationality.press('Enter');

        // Fill identification and basic details
        await this.passportNumber.fill(employee.passportNum);
        await this.firstName.fill(employee.firstName);
        await this.lastName.fill(employee.lastName);
        await this.phoneNumber.fill(employee.phoneNum);

        // Select gender
        await this.selectGender(employee.gender);

        await this.continueBtn.click();
    }

    /**
     * Selects the trade and sets the rate for the employee
     * @param rate Employee's rate/salary
     */
    private async selectTradeAndRate(rate: string) {
        await this.selectTrade.click();
        await this.plumberTradeOption.click();
        await this.rateSalary.fill(rate);
    }

    /**
     * Sets up the payment information for the employee
     * @param accountNum Employee's bank account number
     */
    private async setupPaymentInformation(accountNum: string) {
        await this.paymentMethod.click();
        await this.equityBankOption.click();
        await this.accountNumber.fill(accountNum);
        await this.continueBtn.click();
    }

    /**
     * Finalizes the employee creation by saving the form
     */
    private async finalizeEmployeeCreation() {
        await this.continueBtn.click();
        await this.saveEmployeeBtn.click();
    }

    /**
     * Uploads a document for the employee
     * @param fileName Name of the file to upload
     */
    async uploadDocument(fileName: string) {
        await this.uploadDocumentBtn.click();
        const filePath = path.resolve(fileName);
        await this.page.locator('input[type=\'file\']').setInputFiles(filePath);

        // Click on next
        await this.processUploadDocumentBtn.click();
    }

    async navigateToEmployeesPage() {
        await this.employeesSection.click();
    }

    async selectGender(option: string) {
        // Click dropdown
        await this.genderDropDown.click();

        // Click only the visible option inside the dropdown
        await this.page.locator('[role="option"]', { hasText: option }).click();
    }

}
