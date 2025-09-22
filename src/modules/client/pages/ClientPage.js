import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EnhancedTable from "../../../shared/components/Table";
import { useEffect, useState } from "react";
import ClientFilterAdd from "../components/ClientFIlterAdd";
import ClientFormDialog from "../components/ClientFormDialog";
import clientService from "../services/clientService";
const ClientPage = () => {
    const headCells = [
        { id: "name", numeric: false, disablePadding: false, label: "Name" },
        { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
        { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
        { id: "address", numeric: false, disablePadding: false, label: "Address" },
    ];
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [clients, setClients] = useState([]);
    const handleAddClient = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleCreateClient = async (data) => {
        try {
            const res = await clientService.createClient(data);
            fetchClients();
        }
        catch (err) {
            console.error("Failed to create client:", err);
        }
        setOpenDialog(false);
    };
    async function fetchClients() {
        const fetchedClients = await clientService.getClients();
        setClients(fetchedClients);
    }
    useEffect(() => {
        fetchClients();
    }, []);
    return (_jsxs("div", { children: [_jsx(ClientFilterAdd, { search: search, setSearch: setSearch, onAddClient: handleAddClient }), _jsx(EnhancedTable, { order: order, setOrder: setOrder, orderBy: orderBy, setOrderBy: setOrderBy, selected: selected, setSelected: setSelected, page: page, setPage: setPage, dense: dense, setDense: setDense, rowsPerPage: rowsPerPage, rows: clients, headCells: headCells, id: "id" }), _jsx(ClientFormDialog, { open: openDialog, onClose: handleCloseDialog, onSubmit: handleCreateClient })] }));
};
export default ClientPage;
