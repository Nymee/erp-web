import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import EnhancedTable from "../../../shared/components/Table";
import ProductFilterAdd from "../components/ProductFilterAdd";
import ProductAddDialog from "../components/ProductAddDialog";
import productService from "../productService";
const ProductPage = () => {
    const headCells = [
        { id: "name", numeric: false, disablePadding: false, label: "Name" },
        { id: "cost_price", numeric: true, disablePadding: false, label: "Cost Price" },
        { id: "retail_margin", numeric: true, disablePadding: false, label: "Retail Margin" },
        { id: "discount_price", numeric: true, disablePadding: false, label: "Discount" },
        { id: "gst", numeric: true, disablePadding: false, label: "GST" },
        { id: "cess", numeric: true, disablePadding: false, label: "Cess" },
        { id: "sales_price", numeric: true, disablePadding: false, label: "Sales Price" },
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
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    // handlers
    const handlePageChange = (newPage) => {
        setQuery((prev) => ({ ...prev, page: newPage }));
    };
    const handleSearchChange = (value) => {
        setQuery((prev) => ({ ...prev, page: 0, search: value }));
    };
    const handleAddProduct = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleCreateProduct = async (data) => {
        try {
            await productService.createProduct(data);
            await fetchProducts();
        }
        catch (err) {
            console.error("Failed to create product:", err);
        }
        finally {
            setOpenDialog(false);
        }
    };
    async function fetchProducts() {
        const res = await productService.getProducts(query);
        setProducts(res.data); // backend paginated data
        setTotalCount(res.total); // backend total count
    }
    useEffect(() => {
        fetchProducts();
    }, [query]);
    return (_jsxs("div", { children: [_jsx(ProductFilterAdd, { search: query.search, setSearch: handleSearchChange, onAdd: handleAddProduct }), _jsx(EnhancedTable, { order: query.order, setOrder: (o) => setQuery((prev) => ({ ...prev, order: o })), orderBy: query.orderBy, setOrderBy: (ob) => setQuery((prev) => ({ ...prev, orderBy: ob })), selected: selected, setSelected: setSelected, page: query.page, setPage: handlePageChange, dense: dense, setDense: setDense, rowsPerPage: query.limit, rows: products, headCells: headCells, id: "_id", totalCount: totalCount }), _jsx(ProductAddDialog, { open: openDialog, onClose: handleCloseDialog, onSubmit: handleCreateProduct })] }));
};
export default ProductPage;
