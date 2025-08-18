import { User } from "lucide-react";
import UserTable from "../components/UserTable";
import EnhancedTable from "../../../shared/components/Table";

const UserPage = () => {
  interface UserData {
    uid: number;
    role: string;
    email: string;
    name: string;
  }

  interface HeadCell<UserData> {
    disablePadding: boolean;
    id: keyof UserData;
    label: string;
    numeric: boolean;
  }

  const userData: UserData[] = [
    { uid: 1, name: "John Doe", role: "Admin", email: "hjdfjsh" },
    { uid: 2, name: "Jane Smith", role: "User", email: "hjdfjsh" },
    { uid: 3, name: "Alice Johnson", role: "User", email: "hjdfjsh" },
    { uid: 4, name: "Bob Brown", role: "User", email: "hjdfjsh" },
  ];
  const headCells: HeadCell[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
  ];
  return (
    <div>
      <EnhancedTable<UserData> rows={userData} headCells={headCells} />
    </div>
  );
};

export default UserPage;
