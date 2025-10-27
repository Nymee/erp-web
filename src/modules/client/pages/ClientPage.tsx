import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import ClientFilterAdd from "../components/ClientFIlterAdd";
import ClientFormDialog from "../components/ClientFormDialog";
import clientService from "../services/clientService";

interface Client {
  id: number;
  name: string;
  email_id: string;
  mobile: string;
  address: string;
}

const ClientPage = () => {
  const headCells: HeadCell<Client>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
    { id: "address", numeric: false, disablePadding: false, label: "Address" },
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState<Client[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleAddClient = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateClient = async (data: any) => {
    try {
      await clientService.createClient(data);
      await fetchClients();
    } catch (err) {
      console.error("Failed to create client:", err);
    } finally {
      setOpenDialog(false);
    }
  };

  async function fetchClients() {
    const fetchedClients = await clientService.getClients();
    console.log(fetchedClients, "fetchedClients");
    setClients(fetchedClients.data);
    setTotalCount(fetchedClients.length);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
          Customer Management
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Manage your customer database and contact information
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <ClientFilterAdd
          search={search}
          setSearch={setSearch}
          onAddClient={handleAddClient}
        />

        <EnhancedTable<Client>
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
          rows={clients}
          headCells={headCells}
          id="id"
          title="Customers"
          totalCount={totalCount}
        />
      </div>

      {/* Dialog */}
      <ClientFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateClient}
      />
    </div>
  );
};

export default ClientPage;
