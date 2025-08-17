import { User } from "lucide-react";
import UserTable from "../components/UserTable";

const UserPage = () => {

    const userData = [
        { id: 1, name: "John Doe", role: "Admin", email: "hjdfjsh" },
        { id: 2, name: "Jane Smith", role: "User", email: "hjdfjsh" },
        { id: 3, name: "Alice Johnson", role: "User", email: "hjdfjsh" },
        { id: 4, name: "Bob Brown", role: "User", email: "hjdfjsh" },
    ];
  return (
    <div>
      <UserTable/>
    </div>
  );
}


export default UserPage;