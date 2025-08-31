import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export default class NavPage extends BasePage {
  readonly page: Page;

  // Store selectors in a central map
  private readonly navLinks: Record<string, Locator>;
  private readonly headers: Record<string, Locator>;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // 🔹 Define nav link locators
    this.navLinks = {
      openNewAccount: page.locator("//a[normalize-space()='Open New Account']"),
      accountOverview: page.locator("//a[normalize-space()='Accounts Overview']"),
      transferFunds: page.locator("//a[normalize-space()='Transfer Funds']"),
      billPay: page.locator("//a[normalize-space()='Bill Pay']"),
      findTransactions: page.locator("//a[normalize-space()='Find Transactions']"),
      updateContactInfo: page.locator("//a[normalize-space()='Update Contact Info']"),
      requestLoan: page.locator("//a[normalize-space()='Request Loan']")
    };

    // 🔹 Define page headers
    this.headers = {
      openNewAccount: page.locator("//h1[normalize-space()='Open New Account']"),
      accountOverview: page.locator("//h1[normalize-space()='Accounts Overview']"),
      transferFunds: page.locator("//h1[normalize-space()='Transfer Funds']"),
      billPay: page.locator("//h1[normalize-space()='Bill Payment Service']"),
      findTransactions: page.locator("//h1[normalize-space()='Find Transactions']"),
      updateContactInfo: page.locator("//h1[normalize-space()='Update Profile']"),
      requestLoan: page.locator("//h1[normalize-space()='Apply for a Loan']")
    };
  }

 
  async navigateTo(pageName: keyof typeof this.navLinks) {
    await this.clickElement(this.navLinks[pageName]);
  }

  async getHeaderText(pageName: keyof typeof this.headers): Promise<string> {
    return this.getElementText(this.headers[pageName]);
  }
}
