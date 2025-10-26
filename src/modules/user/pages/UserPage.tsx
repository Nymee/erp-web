import EnhancedTable from "../../../shared/components/Table";
import type {
  BasicQuery,
  HeadCell,
  User,
} from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import UserFilterAdd from "../components/UserFilterAdd";
import UserFormDialog from "../components/UserFormDialog";
import userService from "../userService";

const UserPage = () => {
  const headCells: HeadCell<User>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "role", numeric: false, disablePadding: false, label: "Role" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
  ];

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<User[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);

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
    const res = await userService.getUsers(query);
    setUsers(res.data);
    setTotalCount(res.total);
  }

  useEffect(() => {
    fetchUsers();
  }, [query]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
          Executive Management
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Manage your sales team, roles, and user accounts
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <UserFilterAdd
          search={query.search}
          setSearch={handleSearchChange}
          onAdd={handleAddUser}
        />
        
        <EnhancedTable<User>
          order={query.order}
          setOrder={(o) => setQuery((prev) => ({ ...prev, order: o }))}
          orderBy={query.orderBy}
          setOrderBy={(ob) => setQuery((prev) => ({ ...prev, orderBy: ob }))}
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
          title="Executives"
          totalCount={totalCount}
        />
      </div>

      {/* Dialog */}
      <UserFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UserPage;