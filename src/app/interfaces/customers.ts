export interface ICustomer {
  id?: number;
  name: string;
  documentNumber: string;
  phoneNumber: string;
  monthlyIncome: number;
  address:{
    street: string,
    number: string,
    zipCode: string
  }
}
