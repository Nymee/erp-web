  export interface HeadCell<T> {
    disablePadding: boolean;
    id: keyof T;
    label: string;
    numeric: boolean;
  }

  export interface UserData {
    uid: number;
    role: string;
    email: string;  
    name: string;
  }