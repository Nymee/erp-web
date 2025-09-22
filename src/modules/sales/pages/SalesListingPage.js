import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import EnhancedTable from "../../../shared/components/Table";
import ProductFilter from "../components/ProductFilter";
import productService from "../../products/productService";
import salesService from "../salesService";
const SalesListingPage = () => {
    // const headCells: HeadCell<ProductList>[] = [
    // { id: "name", numeric: false, disablePadding: false, label: "Name" },
    // { id: "cost_price", numeric: true, disablePadding: false, label: "Cost Price" },
    // { id: "retail_margin", numeric: true, disablePadding: false, label: "Retail Margin" },
    // { id: "discount_price", numeric: true, disablePadding: false, label: "Discount" },
    // { id: "gst", numeric: true, disablePadding: false, label: "GST" },
    // { id: "cess", numeric: true, disablePadding: false, label: "Cess" },
    // { id: "sales_price", numeric: true, disablePadding: false, label: "Sales Price" },
    // ];
    // const [query, setQuery] = useState<BasicQuery>({
    //   page: 0,
    //   limit: 10,
    //   order: "asc",
    //   orderBy: "name",
    //   search: "",
    // });
    // const [selected, setSelected] = useState<number[]>([]);
    // const [dense, setDense] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false);
    // const [products, setProducts] = useState<ProductList[]>([]);
    // const [totalCount, setTotalCount] = useState(0);
    // // handlers
    // const handlePageChange = (newPage: number) => {
    //   setQuery((prev) => ({ ...prev, page: newPage }));
    // };
    // const handleSearchChange = (value: string) => {
    //   setQuery((prev) => ({ ...prev, page: 0, search: value }));
    // };
    // const handleAddProduct = () => setOpenDialog(true);
    // const handleCloseDialog = () => setOpenDialog(false);
    // const handleCreateProduct = async (data: ProductCreate) => {
    //   try {
    //     await productService.createProduct(data);
    //     await fetchProducts();
    //   } catch (err) {
    //     console.error("Failed to create product:", err);
    //   } finally {
    //     setOpenDialog(false);
    //   }
    // };
    // async function fetchProducts() {
    //   const res = await salesService.getSalesProducts(query);
    //   setProducts(res.data);   // backend paginated data
    //   setTotalCount(res.total); // backend total count
    // }
    // useEffect(() => {
    //   fetchProducts();
    // }, [query]);
    return (_jsx("div", {}));
};
export default SalesListingPage;
