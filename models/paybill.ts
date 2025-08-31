export interface Payee {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  account: string;  // you’ll pass this later
  verifyAccount: string;  // you’ll pass this later
  amount: number;
}
