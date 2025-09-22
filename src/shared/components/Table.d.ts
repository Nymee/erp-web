import * as React from "react";
import type { HeadCell } from "../../interfaces/interfaces";
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
}
export default function EnhancedTable<T extends Record<string, any>>({ rows, headCells, order, setOrder, orderBy, setOrderBy, selected, setSelected, page, setPage, rowsPerPage, dense, setDense, id, renderAction, totalCount, }: EnhancedTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
