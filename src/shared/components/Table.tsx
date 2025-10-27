import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import type { HeadCell } from "../../interfaces/interfaces";
import { Pagination } from "@mui/material";

type Order = "asc" | "desc";

interface EnhancedTableProps<T> {
  order: Order;
  setOrder: (order: Order) => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  page: number;
  setPage: (page: number) => void;
  dense: boolean;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  rowsPerPage: number;
  rows: T[];
  headCells: HeadCell<T>[];
  id: string;
  renderAction?: (row: T) => React.ReactNode;
  totalCount?: number;
  title?: string;
}

interface EnhancedProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell<T>[];
  renderAction?: (row: T) => React.ReactNode;
}

function EnhancedTableHead<T>(props: EnhancedProps<T>) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    renderAction,
  } = props;

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#f8fafc" }}>
        <TableCell
          padding="checkbox"
          sx={{ borderBottom: "2px solid #e2e8f0" }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all items",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderBottom: "2px solid #e2e8f0",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {renderAction && (
          <TableCell
            align="center"
            sx={{
              borderBottom: "2px solid #e2e8f0",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable<T extends Record<string, any>>({
  rows,
  headCells,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  selected,
  setSelected,
  page,
  setPage,
  rowsPerPage,
  dense,
  id,
  renderAction,
  totalCount = 0,
}: EnhancedTableProps<T>) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(String(property));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: T) => {
    const isSelected = selected.some((s) => s[id] === row[id]);
    let newSelected: T[] = [];

    if (!isSelected) {
      newSelected = [...selected, row];
    } else {
      newSelected = selected.filter((s) => s[id] !== row[id]);
    }
    setSelected(newSelected);
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  console.log(rows, "ROWWWW");

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        {/* Table with natural content sizing */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy as string}
              headCells={headCells}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              renderAction={renderAction}
            />
            <TableBody>
              {rows?.map((row, index) => {
                const rowId = row[id] as number;
                const isItemSelected = selected.includes(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={rowId}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>

                    {headCells.map((cell) => (
                      <TableCell
                        key={String(cell.id)}
                        align={cell.numeric ? "right" : "left"}
                        padding={cell.disablePadding ? "none" : "normal"}
                      >
                        {row[cell.id]}
                      </TableCell>
                    ))}
                    {renderAction && (
                      <TableCell align="center">{renderAction(row)}</TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
          }}
        >
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, newPage) => setPage(newPage - 1)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>
    </Box>
  );
}
