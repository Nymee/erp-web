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
