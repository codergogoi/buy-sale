export interface UserInput {}

export interface SellerProgramInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bankAccountNumber: string;
  swiftCode: string;
  paymentType: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postCode: string;
    country: string;
  };
}
