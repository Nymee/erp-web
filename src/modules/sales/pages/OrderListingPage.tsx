import { useEffect, useState } from "react";
import { BasicQuery, HeadCell } from "../../../interfaces/interfaces";
import EnhancedTable from "../../../shared/components/Table";
import salesService from "../salesService";

interface SalesList {
  _id: string;
  name: string;
  client_name: string;
  clientId: string;
  order_no: string;
  grand_total: number;
  products: any[];
  type: string;
}

const OrderListingPage = () => {
  const headCells: HeadCell<SalesList>[] = [
    {
      id: "order_no",
      numeric: false,
      disablePadding: false,
      label: "Order No",
    },
    {
      id: "client_name",
      numeric: false,
      disablePadding: false,
      label: "Customer",
    },
    { id: "grand_total", numeric: true, disablePadding: false, label: "Total" },
    { id: "type", numeric: true, disablePadding: false, label: "Type" },
  ];

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "order_no",
    search: "",
  });

  const [selected, setSelected] = useState<SalesList[]>([]);
  const [dense, setDense] = useState(false);
  const [sales, setSales] = useState<SalesList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const type = "order";

  // Pagination & Search Handlers
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  // Fetch Sales Orders
  async function fetchSales() {
    try {
      const res = await salesService.getSales(query, type);
      setSales(res.data);
      setTotalCount(res.total);
    } catch (err) {
      console.error("Failed to fetch sales orders:", err);
    }
  }

  useEffect(() => {
    fetchSales();
  }, [query]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl shadow-lg border border-purple-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
          Sales Orders
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Review and manage all sales orders
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by name or order no..."
            value={query.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <EnhancedTable<SalesList>
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
          rows={sales}
          headCells={headCells}
          id="_id"
          totalCount={totalCount}
          title="Sales Orders"
        />
      </div>
    </div>
  );
};

export default OrderListingPage;
