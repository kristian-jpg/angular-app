export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
}

export interface Address {
  street: string;
  city: string;
  zipcode?: string;
}
