import { useEffect, useState } from "react";
import type { BasicQuery, HeadCell } from "../../../interfaces/interfaces";
import EnhancedTable from "../../../shared/components/Table";
import InventoryAddForm from "../components/InventoryAddForm";
import { createInventory, getInventory, getInventoryProducts } from "../services/inventoryService";
import { epochToDate } from "../../../utility/epoch-converter";

interface Inventory {
  id: number;
  product_id: string;
  product_name: string;
  supplier_id: number;
  supplier_name: string;
  quantity: number;
  updated_date?: string;
}

const InventoryPage = () => {
  const headCells: HeadCell<Inventory>[] = [
    { id: "product_name", numeric: false, disablePadding: false, label: "Product" },
    { id: "supplier_name", numeric: false, disablePadding: false, label: "Supplier" },
    { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
        { id: "updated_date", numeric: true, disablePadding: false, label: "Last Updated" },

  ];

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "product_name",
    search: "",
  });

  const [selected, setSelected] = useState<Inventory[]>([]);
  const [dense, setDense] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // 🔹 handlers
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  const handleAddInventory = async (data: {
    productId: string;
    supplierId: string;
    quantity: number;
    created_date: number;
  }) => {
    try {
      await createInventory(data);
      await fetchInventory();
    } catch (err) {
      console.error("Failed to create inventory:", err);
    }
  };

  async function fetchInventory() {
    try {
      const res = await getInventoryProducts(query);
      const data = res.data.map((item: any) => ({
        ...item,
        updated_date: item.updated_date ? epochToDate(item.updated_date) : "N/A",
      }));
      
      setInventory(data);
      setTotalCount(res.total);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setInventory([]);
      setTotalCount(0);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, [query]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
          Inventory Management
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Track and manage your product inventory from suppliers
        </p>
      </div>

      {/* Add Inventory Form */}
      <InventoryAddForm onAdd={handleAddInventory} />

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <EnhancedTable<Inventory>
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
          rows={inventory}
          headCells={headCells}
          id="id"
          title="Inventory Items"
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
