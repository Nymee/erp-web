import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell, Product, ProductQuery } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import ProductFilterAdd from "../components/ProductFilterAdd";
import ProductFormDialog from "../components/ProductFormDialog";
import productService from "../services/productService";

const ProductPage = () => {
  const headCells: HeadCell<Product>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "category", numeric: false, disablePadding: false, label: "Category" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    { id: "stock", numeric: true, disablePadding: false, label: "Stock" },
  ];

  const [query, setQuery] = useState<ProductQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // Handlers
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (order: "asc" | "desc", orderBy: keyof Product) => {
    setQuery((prev) => ({
      ...prev,
      order,
      orderBy,
    }));
  };

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  const handleAddProduct = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateProduct = async (data: any) => {
    try {
      await productService.createProducts(data);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setOpenDialog(false);
    }
  };

  async function fetchProducts() {
    const res = await productService.getProducts(query);
    setProducts(res.data);
    setTotalCount(res.total);
  }

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <div>
      <ProductFilterAdd
        search={query.search}
        setSearch={handleSearchChange}
        onAddProduct={handleAddProduct}
      />
      <EnhancedTable<Product>
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
        rows={products}
        headCells={headCells}
        id="_id"
        totalCount={totalCount}
      />
      <ProductFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default ProductPage;
