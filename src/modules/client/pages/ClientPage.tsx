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
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  const handleAddClient = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateClient = async (data: any) => {
    try {
      const res = await clientService.createClient(data);
      fetchClients();
    } catch (err) {
      console.error("Failed to create client:", err);
    }
    setOpenDialog(false);
  };

  async function fetchClients() {
    const fetchedClients = await clientService.getClients();
    setClients(fetchedClients);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
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
      />
      <ClientFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleCreateClient}
      />
    </div>
  );
};

export default ClientPage;
