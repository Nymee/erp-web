import { useEffect, useState } from "react";
import type {
  BasicQuery,
  HeadCell,
  ProductCreate,
  SalesProductList,
} from "../../../interfaces/interfaces";
import EnhancedTable from "../../../shared/components/Table";
import ProductFilter from "../components/ProductFilter";
import productService from "../../products/productService";
import CheckoutBar from "../components/CheckoutBar";
import { useNavigate } from "react-router-dom";
import salesService from "../salesService";
import clientService from "../../client/services/clientService";

const AddProduct = () => {
  const headCells: HeadCell<SalesProductList>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    {
      id: "cost_price",
      numeric: true,
      disablePadding: false,
      label: "Cost Price",
    },
    {
      id: "retail_margin",
      numeric: true,
      disablePadding: false,
      label: "Retail Margin",
    },
    { id: "discount", numeric: true, disablePadding: false, label: "Discount" },
    { id: "gst", numeric: true, disablePadding: false, label: "GST" },
    { id: "cess", numeric: true, disablePadding: false, label: "Cess" },
    {
      id: "sales_price",
      numeric: true,
      disablePadding: false,
      label: "Sales Price",
    },
    {
      id: "margin_unit",
      numeric: true,
      disablePadding: false,
      label: "Margin Unit",
    },
  ];

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<SalesProductList[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState<SalesProductList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const [clients, setClients] = useState<{ _id: string; name: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");

  const navigate = useNavigate();

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
    const res = await salesService.getSalesProducts(query);
    setProducts(res.data);
    setTotalCount(res.total);
  }

  async function fetchClients() {
    try {
      const res = await clientService.getClients({ dropdown: true });
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    }
  }

  const handleCheckout = () => {
    if (!selectedClient) {
      alert("Please select a client before checkout.");
      return;
    }
    navigate("/checkout", {
      state: {
        clientId: selectedClient,
        products: selected,
      },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    setProductCount(selected.length);
  }, [selected]);

  return (
    <div>
      {/* Client dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Client:</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">-- Select Client --</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <ProductFilter search={query.search} setSearch={handleSearchChange} />

      <EnhancedTable<SalesProductList>
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

      {productCount > 0 && (
        <CheckoutBar
          productCount={productCount}
          handleCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default AddProduct;
