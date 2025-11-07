import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import SupplierFilterAdd from "../components/SupplierFilterAdd";
import SupplierFormDialog from "../components/SupplierFormDialog";
import { getSuppliers, createSupplier } from "../services/supplierService";

interface Supplier {
  id: number;
  name: string;
  email_id: string;
  mobile: string;
  address: string;
}

const SupplierPage = () => {
  const headCells: HeadCell<Supplier>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
    { id: "address", numeric: false, disablePadding: false, label: "Address" },
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState<Supplier[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleAddSupplier = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateSupplier = async (data: any) => {
    try {
      await createSupplier(data);
      await fetchSuppliers();
    } catch (err) {
      console.error("Failed to create supplier:", err);
    } finally {
      setOpenDialog(false);
    }
  };

  async function fetchSuppliers() {
    const fetchedSuppliers = await getSuppliers();
    console.log(fetchedSuppliers, "fetchedSuppliers");
    setSuppliers(fetchedSuppliers.data);
    setTotalCount(fetchedSuppliers.length);
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
          Supplier Management
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Manage your supplier database and contact information
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <SupplierFilterAdd
          search={search}
          setSearch={setSearch}
          onAddSupplier={handleAddSupplier}
        />

        <EnhancedTable<Supplier>
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          selected={selected}
          setSelected={setSelected}
          page={page}
          setPage={setPage}
          dense={dense}
          setDense={setDense}
          rowsPerPage={rowsPerPage}
          rows={suppliers}
          headCells={headCells}
          id="id"
          title="Suppliers"
          totalCount={totalCount}
        />
      </div>

      {/* Dialog */}
      <SupplierFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateSupplier}
      />
    </div>
  );
};

export default SupplierPage;
