import { Page } from '@playwright/test';
import BasePage from './BasePage';

export interface AccountInfo {
  accountNumber: string;
  balance: string;
  availableBalance: string;
  balanceValue: number;           // numeric form
  availableBalanceValue: number;  // numeric form
  rowIndex: number;               // 1-based index
}

export default class AccountsOverviewPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  // Utility: strip $ and convert to number
  private parseCurrency(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }

  
  async getAccountDetails(accountNumber: string, timeout = 5000): Promise<AccountInfo | undefined> {
    // Wait for table rows to load
    await this.page.waitForSelector('//table[@id="accountTable"]/tbody/tr', { timeout });
    // Normalize account number input
    accountNumber = accountNumber.trim();
    const rows = this.page.locator('//table[@id="accountTable"]/tbody/tr');
    const rowCount = await rows.count();

    for (let i = 1; i <= rowCount; i++) {
      const accLocator = this.page.locator(`//table[@id="accountTable"]/tbody/tr[${i}]/td[1]/a`);
      if (await accLocator.count() === 0) continue; // skip footer/Total rows

      const accNumText = (await accLocator.innerText()).trim();
      if (accNumText === accountNumber) {
        const balanceText = (await this.page.locator(`//table[@id="accountTable"]/tbody/tr[${i}]/td[2]`).innerText()).trim();
        const availableText = (await this.page.locator(`//table[@id="accountTable"]/tbody/tr[${i}]/td[3]`).innerText()).trim();

        return {
          accountNumber: accNumText,
          balance: balanceText,
          availableBalance: availableText,
          balanceValue: this.parseCurrency(balanceText),
          availableBalanceValue: this.parseCurrency(availableText),
          rowIndex: i,
        };
      }
    }

    return undefined; // not found
  }
}
