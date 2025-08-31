import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';
import * as testdata from "../testdata/testdata.json"
import { User } from "../models/user";

export default class RegisterPage extends BasePage {

    readonly page: Page;
    private readonly registerlink: Locator
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly address: Locator
    private readonly city: Locator
    private readonly state: Locator
    private readonly zip: Locator
    private readonly phone: Locator
    private readonly ssn: Locator
    private readonly username: Locator
    private readonly password: Locator
    private readonly registerButton: Locator
    private readonly successHeader: Locator
    private readonly confirmPassword: Locator


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.registerlink = page.locator("//a[normalize-space()='Register']");
        this.firstName = page.locator("//input[@id='customer.firstName']");
        this.lastName = page.locator("//input[@id='customer.lastName']");
        this.address = this.page.locator("//input[@id='customer.address.street']");
        this.city = this.page.locator("//input[@id='customer.address.city']");
        this.state = this.page.locator("//input[@id='customer.address.state']");
        this.zip = this.page.locator("//input[@id='customer.address.zipCode']");
        this.phone = this.page.locator("//input[@id='customer.phoneNumber']");
        this.ssn = this.page.locator("//input[@id='customer.ssn']");
        this.username = this.page.locator("//input[@id='customer.username']");
        this.password = this.page.locator("//input[@id='customer.password']");
        this.registerButton = this.page.locator("//input[@value='Register']");
        this.successHeader = this.page.locator("h1");
        this.confirmPassword = this.page.locator("#repeatedPassword");
    }

    async navigateToRegisterPage() {
        await this.navigateTo(testdata.URL);
    }


    async registerlinkClick() {

        await this.clickElement(this.registerlink);
    }

    async register(user: User) {
       
        await this.firstName.waitFor({ state: 'attached' });
        await this.fillFormField(this.firstName, user.firstName);
        await this.fillFormField(this.lastName, user.lastName);
        await this.fillFormField(this.lastName, user.lastName);
        await this.fillFormField(this.address, user.address);
        await this.fillFormField(this.city, user.city);
        await this.fillFormField(this.state, user.state);
        await this.fillFormField(this.zip, user.zip);
        await this.fillFormField(this.phone, user.phone);
        await this.fillFormField(this.ssn, user.ssn);
        await this.fillFormField(this.username, user.username);
        await this.fillFormField(this.password, user.password);
        await this.fillFormField(this.confirmPassword, user.password);
         await this.clickElement(this.registerButton);

        // Assertion (optional here, or move to test)
       
    }
    async assertRegistrationSuccess() {
        await this.successHeader.waitFor({ state: 'visible' });
        const headerText = await this.getElementText(this.successHeader);
        return headerText;
    }
}
