import { test, expect } from '../../fixture/fixture';
import { UserFactory } from '../../utils/helper';
import fs from "fs";
import path from "path";
let registeredUsername: string;
let newAccountNumber: string;
test.describe('ParaBank E2E UI Flow', () => {
  test('Full ParaBank E2E including account creation, transfer and billpay', async ({
    page,
    registerPage,
    loginPage,
    userWelcomePage,
    navPage,
    openAccountPage,
    accountsOverviewPage,
    transferPage,
    billPayPage
  }) => {

    const user = UserFactory.generateData();


    // 1. Navigate to Para bank application
    await test.step('Navigate to ParaBank application', async () => {
      await registerPage.navigateToRegisterPage();
    });

    // 2. Create a new user
    await test.step('Create a new user via Registration Page', async () => {
      await registerPage.registerlinkClick();
      await registerPage.register(user);
    });

    // 3. Login with the new user
    await test.step('Login with newly registered user', async () => {
      registeredUsername = await userWelcomePage.getRegisteredUsername();
      await userWelcomePage.clickOnLogoutLink();
      await loginPage.loginToApplication(registeredUsername, user.password);
      const filePath = path.join(__dirname, "../../testdata/logindata.json");
      fs.writeFileSync(filePath, JSON.stringify({ registeredUsername: registeredUsername }, null, 2));
    });

    // 4. Verify navigation menu
    await test.step('Verify global navigation menu links', async () => {
      await navPage.navigateTo("openNewAccount");
      expect(await navPage.getHeaderText("openNewAccount")).toBe("Open New Account");

      await navPage.navigateTo("accountOverview");
      expect(await navPage.getHeaderText("accountOverview")).toBe("Accounts Overview");

      await navPage.navigateTo("transferFunds");
      expect(await navPage.getHeaderText("transferFunds")).toBe("Transfer Funds");

      await navPage.navigateTo("billPay");
      expect(await navPage.getHeaderText("billPay")).toBe("Bill Payment Service");

      await navPage.navigateTo("findTransactions");
      expect(await navPage.getHeaderText("findTransactions")).toBe("Find Transactions");

      await navPage.navigateTo("updateContactInfo");
      expect(await navPage.getHeaderText("updateContactInfo")).toBe("Update Profile");

      await navPage.navigateTo("requestLoan");
      expect(await navPage.getHeaderText("requestLoan")).toBe("Apply for a Loan");
    });

    // 5. Create savings account

    await test.step('Create a Savings account and capture account number', async () => {
      await navPage.navigateTo("openNewAccount");
      await openAccountPage.selectAccountTypeDropdown("SAVINGS");
      newAccountNumber = await openAccountPage.openSavingsAccount();
      expect(newAccountNumber).toBeTruthy();
      const filePath = path.join(__dirname, "../../testdata/accountdata.json");
      fs.writeFileSync(filePath, JSON.stringify({ accountNumber: newAccountNumber }, null, 2));

    });

    // 6. Validate Accounts overview page
    await test.step('Validate Accounts Overview page shows new account with expected balance', async () => {
      await navPage.navigateTo("accountOverview");
      const accountDetails = await accountsOverviewPage.getAccountDetails(newAccountNumber);
      expect(accountDetails).toBeTruthy();
      expect(accountDetails?.balanceValue).toBe(100);
      expect(accountDetails?.availableBalanceValue).toBe(100);
    });

    // 7. Transfer funds
    await test.step('Transfer funds from new account to another account', async () => {
      await navPage.navigateTo("transferFunds");
      await transferPage.transferFunds(50);
      expect(await transferPage.isTransferSuccessful()).toBe(true);
    });

    // 8. Pay bill
    await test.step('Pay bill using new account', async () => {
      await navPage.navigateTo("billPay");
      const paybill = UserFactory.generatePayee(newAccountNumber);
      await billPayPage.payBill(paybill);
      expect(await billPayPage.assertBillPaymentSuccess()).toBe(true);
    });

  });
});
