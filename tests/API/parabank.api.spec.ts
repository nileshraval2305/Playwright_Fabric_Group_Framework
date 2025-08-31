import { test, expect, request } from '@playwright/test';
import * as accountnum from '../../testdata/accountdata.json'
import * as logindata from '../../testdata/logindata.json';
import * as testdata from '../../testdata/testdata.json';
import playwright from 'playwright';

test.describe('ParaBank API Flow', () => {
  let accountNumber: string;
  let registeredUsername: string;
  let password: string;
  test.beforeAll(() => {
    accountNumber = accountnum.accountNumber;
    registeredUsername = logindata.registeredUsername;
    password = testdata.password;
  });
  
    test('Find transactions by amount after Bill Payment', async ({ request }) => {
    // Assuming you captured accountId and amount from UI test step 8
    const accountId = accountNumber;   // TODO: replace with actual account number from UI step
    const paymentAmount = 50;    // same as used in billPayPage
    console.log(`Searching transactions for accountId: ${accountId}, amount: ${paymentAmount}`);

    const apiContext = await playwright.request.newContext({
      baseURL: 'https://parabank.parasoft.com/parabank/services_proxy/bank',
      httpCredentials: {
        username: registeredUsername,   // your ParaBank username
        password: password    // your ParaBank password
      }
  });

    const response = await apiContext.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${paymentAmount}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    // 2. Validate details in JSON response
    const transactions = await response.json();

    // Basic schema check
    expect(Array.isArray(transactions)).toBe(true);
    expect(transactions.length).toBeGreaterThan(0);

    // Validate transaction details
    const paymentTx = transactions.find((tx: any) => tx.amount === paymentAmount);
    expect(paymentTx).toBeTruthy();

    // Validate important fields
    expect(paymentTx.accountId).toBe(Number(accountId));
    expect(paymentTx.type).toBe('Credit'); // Bill payment should be a credit to the account
    expect(paymentTx.description).toContain('Funds Transfer Received');
  });
});
