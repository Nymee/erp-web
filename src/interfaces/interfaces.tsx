export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: "SAU" | "SE" | "MG" | "ADMIN";
  branchId: string;
  companyId: string;
  password?: string;
  temp_password?: string; // optional if not always present
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  name: string;
  email_id: string;
  mobile: string;
  user_name: string;
  user_email: string;
  user_mobile: string;
}

export interface BasicQuery {
  page: number;
  limit: number;
  order: "asc" | "desc";
  orderBy: string;
  search: string;
}

export interface FilterProps {
  search: string;
  setSearch: (value: string) => void;
  onAdd?: () => void;
}

export interface ProductList {
  name: string;
  cost_price: number;
  retail_margin: number;
  discount: number;
  gst: number;
  cess: number;
  sales_price: number;
}



export interface SalesProductList {
  _id: string;
  name: string;
  cost_price: number;
  retail_margin: number;
  discount: number;       // ✅ fix this
  gst: number;
  cess: number;
  sales_price: number;
  margin_unit: string;    // ✅ add this since API has it
}


export interface ProductCreate {
  name: string;
  cost_price: number;
  retail_margin: number;
  discount_price: number;
  gst: number;
  cess: number;
  sales_price: number;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export type approveCompany = "approved" | "rejected" | "";

export interface CompanyStatusUpdate {
  isVerified: approveCompany;
}
