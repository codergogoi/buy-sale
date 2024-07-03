export interface UserInput {}

export interface SellerProgramInput {
  first_name: string;
  last_name: string;
  phone_number: string;
  bankAccountNumber: number;
  swiftCode: string;
  paymentType: string;
  // address: {
  //   addressLine1: string;
  //   addressLine2: string;
  //   city: string;
  //   postCode: string;
  //   country: string;
  // };
}
