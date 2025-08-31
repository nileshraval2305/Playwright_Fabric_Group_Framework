import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export default class LoginPage extends BasePage{

readonly page:Page;
private readonly inputUserName: Locator;
private readonly inputPassword: Locator;
private readonly loginBtn: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.inputUserName = this.page.locator("//input[@name='username']");
        this.inputPassword = this.page.locator("//input[@name='password']");
        this.loginBtn = this.page.locator("//input[@value='Log In']");
    }

    async loginToApplication(username:string,password:string){
        await this.fillFormField(this.inputUserName, username);
        await this.fillFormField(this.inputPassword, password);
        await this.page.pause();
        await this.clickElement(this.loginBtn);
        
    }

}