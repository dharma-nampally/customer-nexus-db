export interface Address {
  id: string;
  customer_id: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  created_at: string;
  updated_at: string;
}

export interface AddressFormData {
  address_line: string;
  city: string;
  state: string;
  pincode: string;
}