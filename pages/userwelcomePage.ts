import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export default class UserWelcomePage extends BasePage{

readonly page:Page;
private readonly getUserName: Locator;
private readonly logoutlink: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.getUserName = this.page.locator("//h1[@class='title']");
        this.logoutlink = this.page.locator("//a[normalize-space()='Log Out']");
    }

    // inside RegisterPage class
async getRegisteredUsername(): Promise<string> {
  const headingText = await this.getElementText(this.getUserName); 
  // heading looks like: "Welcome Graciela9138c550j876"
  return headingText.replace(/^Welcome\s+/, '').trim();
}

async clickOnLogoutLink() {
 
  await this.clickElement(this.logoutlink);
 
}


}