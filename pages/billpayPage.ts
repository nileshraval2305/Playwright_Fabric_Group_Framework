import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

import { Payee } from "../models/paybill";

export default class BillPayPage extends BasePage {
  private readonly name: Locator;
  private readonly address: Locator;
  private readonly city: Locator;
  private readonly state: Locator;
  private readonly zip: Locator;
  private readonly phone: Locator;
  private readonly account: Locator;
  private readonly verifyAccount: Locator;
  private readonly amount: Locator;
  private readonly fromAccount: Locator;
  private readonly sendPaymentBtn: Locator;
  private readonly successMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.locator("input[name='payee.name']");
    this.address = page.locator("input[name='payee.address.street']");
    this.city = page.locator("input[name='payee.address.city']");
    this.state = page.locator("input[name='payee.address.state']");
    this.zip = page.locator("input[name='payee.address.zipCode']");
    this.phone = page.locator("input[name='payee.phoneNumber']");
    this.account = page.locator("input[name='payee.accountNumber']");
    this.verifyAccount = page.locator("input[name='verifyAccount']");
    this.amount = page.locator("input[name='amount']");
    this.fromAccount = page.locator("//select[@name='fromAccountId']");
    this.sendPaymentBtn = page.locator("//input[@value='Send Payment']");
    this.successMsg = page.locator("h1:has-text('Bill Payment Complete')");
  }

  async payBill(payee: Payee) {
    await this.fillFormField(this.name, payee.name);
    await this.fillFormField(this.address, payee.address);
    await this.fillFormField(this.city, payee.city);
    await this.fillFormField(this.state, payee.state);
    await this.fillFormField(this.zip, payee.zip);
    await this.fillFormField(this.phone, payee.phone);
    await this.fillFormField(this.account, payee.account);
    await this.fillFormField(this.verifyAccount, payee.verifyAccount);
    await this.fillFormField(this.amount, payee.amount.toString());
    await this.fromAccount.selectOption({index: 0});
    await this.sendPaymentBtn.click();
  }

  async assertBillPaymentSuccess(): Promise<boolean> {
    await this.page.waitForSelector("h1:has-text('Bill Payment Complete')");
    return await this.successMsg.isVisible();
  }
}
