import { test as base } from '@playwright/test';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import NavPage from '../pages/NavPage';
import OpenAccountPage from '../pages/OpenAccountPage';
import AccountsOverviewPage from '../pages/AccountsOverviewPage';
import TransferPage from '../pages/TransferPage';
import BillPayPage from '../pages/billpayPage';
import userwelcomePage from '../pages/userwelcomePage';

type ParaBankFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  navPage: NavPage;
  openAccountPage: OpenAccountPage;
  accountsOverviewPage: AccountsOverviewPage;
  transferPage: TransferPage;
  billPayPage: BillPayPage;
  userWelcomePage: userwelcomePage;
};

export const test = base.extend<ParaBankFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navPage: async ({ page }, use) => {
    await use(new NavPage(page));
  },
  openAccountPage: async ({ page }, use) => {
    await use(new OpenAccountPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },
  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
  userWelcomePage: async ({ page }, use) => {
    await use(new userwelcomePage(page));
  },
});

export { expect } from '@playwright/test';
