import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Pagination } from "@mui/material";
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, renderAction, } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { padding: "checkbox", children: _jsx(Checkbox, { color: "primary", indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: {
                            "aria-label": "select all items",
                        } }) }), headCells.map((headCell) => (_jsx(TableCell, { align: headCell.numeric ? "right" : "left", padding: headCell.disablePadding ? "none" : "normal", sortDirection: orderBy === headCell.id ? order : false, children: _jsxs(TableSortLabel, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : "asc", onClick: createSortHandler(headCell.id), children: [headCell.label, orderBy === headCell.id ? (_jsx(Box, { component: "span", sx: visuallyHidden, children: order === "desc" ? "sorted descending" : "sorted ascending" })) : null] }) }, String(headCell.id)))), renderAction && _jsx(TableCell, { align: "center", children: "Action" })] }) }));
}
function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (_jsxs(Toolbar, { sx: [
            {
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            },
            numSelected > 0 && {
                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            },
        ], children: [numSelected > 0 ? (_jsxs(Typography, { sx: { flex: "1 1 100%" }, color: "inherit", variant: "subtitle1", component: "div", children: [numSelected, " selected"] })) : (_jsx(Typography, { sx: { flex: "1 1 100%" }, variant: "h6", id: "tableTitle", component: "div", children: "Users" })), numSelected > 0 ? (_jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { children: _jsx(DeleteIcon, {}) }) })) : (_jsx(Tooltip, { title: "Filter list", children: _jsx(IconButton, { children: _jsx(FilterListIcon, {}) }) }))] }));
}
export default function EnhancedTable({ rows, headCells, order, setOrder, orderBy, setOrderBy, selected, setSelected, page, setPage, rowsPerPage, dense, setDense, id, renderAction, totalCount = 0, }) {
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(String(property));
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows;
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, row) => {
        const isSelected = selected.some((s) => s[id] === row[id]);
        let newSelected = [];
        if (!isSelected) {
            newSelected = [...selected, row];
        }
        else {
            newSelected = selected.filter((s) => s[id] !== row[id]);
        }
        setSelected(newSelected);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    // Calculate total pages based on totalCount and fixed rowsPerPage
    const totalPages = Math.ceil(totalCount / rowsPerPage);
    return (_jsxs(Box, { sx: { width: "100%" }, children: [_jsxs(Paper, { sx: { width: "100%", mb: 2 }, children: [_jsx(EnhancedTableToolbar, { numSelected: selected.length }), _jsx(TableContainer, { children: _jsxs(Table, { sx: { minWidth: 750 }, "aria-labelledby": "tableTitle", size: dense ? "small" : "medium", children: [_jsx(EnhancedTableHead, { numSelected: selected.length, order: order, orderBy: orderBy, headCells: headCells, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: rows?.length, renderAction: renderAction }), _jsx(TableBody, { children: rows?.map((row, index) => {
                                        const rowId = row[id];
                                        const isItemSelected = selected.includes(row);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (_jsxs(TableRow, { hover: true, onClick: (event) => handleClick(event, row), role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, selected: isItemSelected, sx: { cursor: "pointer" }, children: [_jsx(TableCell, { padding: "checkbox", children: _jsx(Checkbox, { color: "primary", checked: isItemSelected, inputProps: { "aria-labelledby": labelId } }) }), headCells.map((cell) => (_jsx(TableCell, { align: cell.numeric ? "right" : "left", padding: cell.disablePadding ? "none" : "normal", children: row[cell.id] }, String(cell.id)))), renderAction && (_jsx(TableCell, { align: "center", children: renderAction(row) }))] }, rowId));
                                    }) })] }) }), _jsx(Box, { sx: { display: "flex", justifyContent: "flex-end", p: 2 }, children: _jsx(Pagination, { count: totalPages, page: page + 1, onChange: (_, newPage) => setPage(newPage - 1), color: "primary", showFirstButton: true, showLastButton: true }) })] }), _jsx(FormControlLabel, { control: _jsx(Switch, { checked: dense, onChange: handleChangeDense }), label: "Dense padding" })] }));
}
