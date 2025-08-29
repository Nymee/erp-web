import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell, User } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import UserFilterAdd from "../components/UserFilterAdd";
import UserFormDialog from "../components/UserFormDialog";
import userService from "../services/userService";
const UserPage = () => {
  const headCells: HeadCell<User>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("name");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateUser = (data: any) => {
    console.log("New User Created:", data);
    // TODO: Add API call or update state logic here
    setOpenDialog(false);
  };

  async function fetchUsers() {
    const fetchedUsers = await userService.getUsers();
    setUsers(fetchedUsers);
  }

  useEffect(() => {
    fetchUsers();
  });
  return (
    <div>
      <UserFilterAdd
        search={search}
        setSearch={setSearch}
        onAddUser={handleAddUser}
      />
      <EnhancedTable<User>
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
        rows={users}
        headCells={headCells}
        id="uid"
      />
      <UserFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UserPage;
