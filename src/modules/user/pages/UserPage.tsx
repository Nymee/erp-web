import EnhancedTable from "../../../shared/components/Table";
import type { BasicQuery, HeadCell, User } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import UserFilterAdd from "../components/UserFilterAdd";
import UserFormDialog from "../components/UserFormDialog";
import userService from "../services/userService";


  

const UserPage = () => {
  const [query, setQuery] = useState<BasicQuery>({
    page: 0,                
    limit: 10,              
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<number[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0); // backend total

  
  const headCells: HeadCell<User>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
  ];
  // Handlers
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };



  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  const handleAddUser = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateUser = async (data: any) => {
    try {
      await userService.createUsers(data);
      await fetchUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
    } finally {
      setOpenDialog(false);
    }
  };

  async function fetchUsers() {
    // Pass query to backend
    const res = await userService.getUsers(query);
    setUsers(res.data);           // your backend should return paginated data
    setTotalCount(res.total);     // and the total count of users
  }

  useEffect(() => {
    fetchUsers();
  }, [query]);

  return (
    <div>
      <UserFilterAdd
        search={query.search}
        setSearch={handleSearchChange}
        onAddUser={handleAddUser}
      />
      <EnhancedTable<User>
        order={query.order}
        setOrder={(o) => setQuery((prev) => ({ ...prev, order: o }))}
        orderBy={query.orderBy}
        setOrderBy={(ob) => setQuery((prev) => ({ ...prev, orderBy: ob as keyof User }))}
        selected={selected}
        setSelected={setSelected}
        page={query.page}
        setPage={handlePageChange}
        dense={dense}
        setDense={setDense}
        rowsPerPage={query.limit} 
        rows={users}
        headCells={headCells}
        id="_id"
        totalCount={totalCount}  
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
