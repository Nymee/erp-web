import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EnhancedTable from "../../../shared/components/Table";
import { useEffect, useState } from "react";
import UserFilterAdd from "../components/UserFilterAdd";
import UserFormDialog from "../components/UserFormDialog";
import userService from "../userService";
const UserPage = () => {
    const headCells = [
        { id: "name", numeric: false, disablePadding: false, label: "Name" },
        { id: "role", numeric: false, disablePadding: false, label: "Role" },
        { id: "email", numeric: false, disablePadding: false, label: "Email" },
        { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
    ];
    const [query, setQuery] = useState({
        page: 0,
        limit: 10,
        order: "asc",
        orderBy: "name",
        search: "",
    });
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0); // backend total
    // Handlers
    const handlePageChange = (newPage) => {
        setQuery((prev) => ({ ...prev, page: newPage }));
    };
    const handleSortChange = (order, orderBy) => {
        setQuery({
            ...query,
            order,
            orderBy,
        });
    };
    const handleSearchChange = (value) => {
        setQuery((prev) => ({ ...prev, page: 0, search: value }));
    };
    const handleAddUser = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleCreateUser = async (data) => {
        try {
            await userService.createUsers(data);
            await fetchUsers();
        }
        catch (err) {
            console.error("Failed to create user:", err);
        }
        finally {
            setOpenDialog(false);
        }
    };
    async function fetchUsers() {
        // Pass query to backend
        const res = await userService.getUsers(query);
        setUsers(res.data); // your backend should return paginated data
        setTotalCount(res.total); // and the total count of users
    }
    useEffect(() => {
        fetchUsers();
    }, [query]);
    return (_jsxs("div", { children: [_jsx(UserFilterAdd, { search: query.search, setSearch: handleSearchChange, onAdd: handleAddUser }), _jsx(EnhancedTable, { order: query.order, setOrder: (o) => setQuery((prev) => ({ ...prev, order: o })), orderBy: query.orderBy, setOrderBy: (ob) => setQuery((prev) => ({ ...prev, orderBy: ob })), selected: selected, setSelected: setSelected, page: query.page, setPage: handlePageChange, dense: dense, setDense: setDense, rowsPerPage: query.limit, rows: users, headCells: headCells, id: "_id", totalCount: totalCount }), _jsx(UserFormDialog, { open: openDialog, onClose: handleCloseDialog, onSubmit: handleCreateUser })] }));
};
export default UserPage;
