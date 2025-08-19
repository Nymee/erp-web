import { User } from "lucide-react";
import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell } from "../../../interfaces/interfaces";
import { useState } from "react";
import UserFilterAdd from "../components/UserFilterAdd";

const UserPage = () => {
  interface UserData {
    uid: number;
    role: string;
    email: string;
    name: string;
  }

  const userData: UserData[] = [
    { uid: 1, name: "John Doe", role: "Admin", email: "hjdfjsh" },
    { uid: 2, name: "Jane Smith", role: "User", email: "hjdfjsh" },
    { uid: 3, name: "Alice Johnson", role: "User", email: "hjdfjsh" },
    { uid: 4, name: "Bob Brown", role: "User", email: "hjdfjsh" },
  ];
  const headCells: HeadCell<UserData>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof UserData>("name");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  return (
    <div>
      <UserFilterAdd search={search} setSearch={setSearch} />
      <EnhancedTable<UserData>
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        selected={selected}
        setSelected={setSelected}
        page={page}
        setPage={setPage}
        dense={dense}
        setDense={setDense}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        rows={userData}
        headCells={headCells}
        id="uid"
      />
    </div>
  );
};

export default UserPage;
