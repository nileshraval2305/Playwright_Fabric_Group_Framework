import { faker } from '@faker-js/faker';
import { User } from '../models/user';
import fs from 'fs';
import path from 'path';
import testdata from '../testdata/testdata.json';
import { Payee } from '../models/paybill';

const counterFile = path.join(__dirname, '../testdata/testdata.json');

export class UserFactory {
  // 🔹 Generate a fully random valid user
  static generateData(): User {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number({ style: 'national' }), // generates a national-style phone number
      ssn: faker.string.numeric(9),
    username: UserFactory.generateUniqueUsername(),
    password: testdata.password, // static password for simplicity
    confirmPassword: testdata.password // static password for simplicity
  };
}

static generateUniqueUsername(): string {
  // read counter
  let counterData = JSON.parse(fs.readFileSync(counterFile, 'utf-8'));
  let nextNum = counterData.lastUsed + 1;

  // base username from faker
  const base = faker.internet.username();

  // combine with counter
  const username = `${base}${nextNum}`;

  // save updated counter
  counterData.lastUsed = nextNum;
  fs.writeFileSync(counterFile, JSON.stringify(counterData, null, 2));

  return username.substring(0, 20); // enforce 20 chars max
}

static generatePayee(accountNumber: string): Payee {
  return {
    name: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: faker.location.zipCode(),
    phone: faker.string.numeric(10),  // 10-digit
    account: accountNumber,
    verifyAccount: accountNumber,                   // controlled externally
    amount: 50,  // fixed amount
  };
}


  
}
