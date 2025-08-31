import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export default class OpenAccountPage extends BasePage {
    getNewAccountNumber() {
      throw new Error('Method not implemented.');
    }
    readonly page: Page;
    private readonly selectAccountType: Locator;
    private readonly submitBtn: Locator;
    private readonly newAccountId: Locator;
    private readonly fundingAccount: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.selectAccountType = this.page.locator('select#type');
        this.submitBtn = this.page.locator("//div[@id='openAccountForm']//form//div//input[@value='Open New Account']");

        this.newAccountId = this.page.locator('a#newAccountId');
        this.fundingAccount = this.page.locator('select#fromAccountId');
    }

async selectAccountTypeDropdown(option: "CHECKING" | "SAVINGS") {
    await this.selectAccountType.selectOption({ label: option });
    // You could also use value: "0" | "1" depending on your needs
  }

    async openSavingsAccount() {
        await this.fundingAccount.selectOption({ index: 0 });
        await this.submitBtn.waitFor({ state: 'visible' });
        await this.submitBtn.click();

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
        await this.page.waitForSelector('a#newAccountId');
        const rawText = await this.newAccountId.textContent();
        const accountNumber = rawText ? rawText.trim().match(/\d+/)?.[0] ?? "" : ""; // extract only digits
        return accountNumber;
    }

  }

