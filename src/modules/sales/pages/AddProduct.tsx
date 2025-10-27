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
import { User } from "lucide-react";

const AddProduct = () => {
  const headCells: HeadCell<SalesProductList>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    {
      id: "cost_price",
      numeric: true,
      disablePadding: false,
      label: "Base Price",
    },
    {
      id: "retail_margin",
      numeric: true,
      disablePadding: false,
      label: "Markup",
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
  const [products, setProducts] = useState<SalesProductList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const [clients, setClients] = useState<{ _id: string; name: string }[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");

  const navigate = useNavigate();

  /** Fetch products */
  async function fetchProducts() {
    const res = await salesService.getSalesProducts(query);
    setProducts(res.data);
    setTotalCount(res.total);
  }

  /** Fetch clients */
  async function fetchClients() {
    try {
      const res = await clientService.getClients(); // replace with your actual API
      setClients(res.data || []);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    }
  }

  /** Search handler */
  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  /** Page change */
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  /** Checkout */
  const handleCheckout = () => {
    if (!selectedClient) {
      alert("Please select a client before proceeding to checkout.");
      return;
    }

    navigate("/sales/checkout", {
      state: {
        clientId: selectedClient,
        products: selected,
      },
    });
  };

  /** Effects */
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
          Sales Product Selection
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Choose a client and select products to create a new order or quotation
        </p>
      </div>

      {/* 🔹 Client Selection Section */}
      <div className="bg-white rounded-xl shadow-md border border-blue-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <User size={24} className="text-blue-700" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Select Client
            </h2>
            <p className="text-sm text-gray-500">
              Assign this order to a customer
            </p>
          </div>
        </div>

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full md:w-72 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">-- Select Client --</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
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
          title="Available Products"
        />
      </div>

      {/* Checkout Bar */}
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
