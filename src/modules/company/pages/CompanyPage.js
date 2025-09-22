import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EnhancedTable from "../../../shared/components/Table";
import { useEffect, useState } from "react";
import { IconButton, Tabs, Tab } from "@mui/material";
import ConfirmationPopup from "../../../shared/components/ConfirmationPopup";
import companyService from "../companyService";
const CompanyPage = () => {
    const headCells = [
        { id: "name", numeric: false, disablePadding: false, label: "Name" },
        { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
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
    const [companies, setCompanies] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [tabIndex, setTabIndex] = useState(0); // 0: Approved, 1: Pending, 2: Rejected
    const status = ["approved", "pending", "rejected"];
    const currentStatus = status[tabIndex];
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [action, setAction] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    // --- Handlers ---
    const handlePageChange = (newPage) => {
        setQuery((prev) => ({ ...prev, page: newPage }));
    };
    const handleSearchChange = (value) => {
        setQuery((prev) => ({ ...prev, page: 0, search: value }));
    };
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const getProps = (status) => {
        if (status === "approve") {
            return {
                title: "Reject Company",
                message: "Are you sure you want to reject this company?",
            };
        }
        else if (status === "reject") {
            return {
                title: "Approve Company",
                message: "Are you sure you want to approve this company?",
            };
        }
        return { title: "", message: "" };
    };
    const handleConfirm = async () => {
        let body = null;
        if (action === "approve") {
            body = { isVerified: "approved" };
        }
        else if (action === "reject") {
            body = { isVerified: "rejected" };
        }
        console.log("BLEEEEE", selectedRow, body);
        if (selectedRow && body) {
            try {
                await companyService.statusUpdateCompany(selectedRow._id, body);
                await fetchCompanies();
            }
            catch (err) {
                console.error("Failed to update company status:", err);
            }
            finally {
                setOpenDialog(false);
            }
        }
        else {
            console.error("selectedRow or body is null/undefined");
        }
    };
    async function fetchCompanies() {
        try {
            const res = await companyService.getCompanies(query, currentStatus);
            setCompanies(res.data);
            setTotalCount(res.total);
        }
        catch (err) {
            console.error("Failed to fetch companies:", err);
        }
    }
    useEffect(() => {
        fetchCompanies();
    }, [query, tabIndex]);
    return (_jsxs("div", { className: "p-4", children: [_jsx("div", { className: "mb-4", children: _jsx("input", { type: "text", placeholder: "Search by name, email, or mobile", value: query.search, onChange: (e) => handleSearchChange(e.target.value), className: "w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }) }), _jsxs(Tabs, { value: tabIndex, onChange: handleTabChange, className: "mb-4", children: [_jsx(Tab, { label: "Approved" }), _jsx(Tab, { label: "Pending" }), _jsx(Tab, { label: "Rejected" })] }), _jsx(EnhancedTable, { order: query.order, setOrder: (o) => setQuery((prev) => ({ ...prev, order: o })), orderBy: query.orderBy, setOrderBy: (ob) => setQuery((prev) => ({ ...prev, orderBy: ob })), selected: selected, setSelected: setSelected, page: query.page, setPage: handlePageChange, dense: dense, setDense: setDense, rowsPerPage: query.limit, rows: companies, headCells: headCells, id: "_id", totalCount: totalCount, renderAction: (row) => currentStatus === "pending" ? (_jsxs("div", { className: "flex gap-2", children: [_jsx(IconButton, { color: "success", onClick: () => {
                                setSelectedRow(row);
                                setAction("approve");
                                setOpenDialog(true);
                            }, children: "\u2714" }), _jsx(IconButton, { color: "error", onClick: () => {
                                setSelectedRow(row);
                                setAction("reject");
                                setOpenDialog(true);
                            }, children: "\u2716" })] })) : null }), _jsx(ConfirmationPopup, { open: openDialog, onClose: () => setOpenDialog(false), onConfirm: handleConfirm, ...getProps(action) })] }));
};
export default CompanyPage;
