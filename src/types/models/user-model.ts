export interface UserModel {
  token: string;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  phone: string;
  createdAt: string;
  user_type: string;
}

export interface RegisterModel {
  email: string;
  phone: string;
  password: string;
}
