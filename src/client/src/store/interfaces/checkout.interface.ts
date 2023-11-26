export interface Address {
  first_name: string;
  last_name: string;
  country: string;
  address: string;
  apartment: string;
  city: string;
  postcode: string;
  phone: string;
}

export interface CheckoutForm {
  shipping_address: Address;
  email: string;
}
