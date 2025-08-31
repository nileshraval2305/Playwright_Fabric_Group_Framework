import { Locator, Page } from "@playwright/test";
import BasePage from './BasePage';

export default class RegisterPage extends BasePage {

    readonly page: Page;
    private readonly amount: Locator;
    private readonly fromAccount: Locator;
    private readonly toAccount: Locator;
    private readonly transferBtn: Locator;
    private readonly successMsg: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.amount = page.locator("#amount");
        this.fromAccount = page.locator("#fromAccountId");
        this.toAccount = page.locator("#toAccountId");
        this.transferBtn = page.locator("//input[@value='Transfer']");
        this.successMsg = page.locator("h1:has-text('Transfer Complete!')");
    }

async transferFunds(amount: number) {
    await this.fillFormField(this.amount, amount.toString());
    await this.fromAccount.selectOption({ index: 0 });
    await this.toAccount.selectOption({ index: 1 });
    await this.transferBtn.click();
  }

    async isTransferSuccessful(): Promise<boolean> {

        await this.page.waitForSelector("h1:has-text('Transfer Complete!')");
        return await this.successMsg.isVisible();
    }

}
