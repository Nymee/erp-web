import { useEffect, useState } from "react";
import type { BasicQuery, HeadCell, ProductCreate, ProductList } from "../../../interfaces/interfaces";
import EnhancedTable from "../../../shared/components/Table";
import ProductFilterAdd from "../components/ProductFilterAdd";
import ProductAddDialog from "../components/ProductAddDialog";
import productService from "../productService";

const ProductPage = () => {
  const headCells: HeadCell<ProductList>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "cost_price", numeric: true, disablePadding: false, label: "Base Price" },
    { id: "retail_margin", numeric: true, disablePadding: false, label: "Markup" },
    { id: "discount", numeric: true, disablePadding: false, label: "Discount" },
    { id: "gst", numeric: true, disablePadding: false, label: "GST" },
    { id: "cess", numeric: true, disablePadding: false, label: "Cess" },
    { id: "sales_price", numeric: true, disablePadding: false, label: "Sales Price" },
  ];

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<ProductList[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState<ProductList[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // handlers
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  const handleAddProduct = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateProduct = async (data: ProductCreate) => {
    try {
      await productService.createProduct(data);
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
  <div className="space-y-6 max-w-7xl mx-auto">
    {/* Page Header */}
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
        Product Management
      </h1>
      <p className="text-gray-600 text-sm mt-2">
        Manage your product catalog, pricing, and inventory
      </p>
    </div>

    {/* Table Section - Natural sizing */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <ProductFilterAdd
        search={query.search}
        setSearch={handleSearchChange}
        onAdd={handleAddProduct}
      />
      
      <EnhancedTable<ProductList>
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
        title="Products"
      />
    </div>

    {/* Dialog */}
    <ProductAddDialog
      open={openDialog}
      onClose={handleCloseDialog}
      onSubmit={handleCreateProduct}
    />
  </div>
);
};

export default ProductPage;