export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at: string;
  updated_at: string;
}

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

export interface CustomerFormData {
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  state?: string;
  pincode?: string;
}