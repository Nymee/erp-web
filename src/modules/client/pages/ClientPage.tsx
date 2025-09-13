import EnhancedTable from "../../../shared/components/Table";
import type { BasicQuery, HeadCell } from "../../../interfaces/interfaces";
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



  const [selected, setSelected] = useState<number[]>([]);
  const [dense, setDense] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [totalCount, setTotalCount] = useState(0); // backend total

  const [query, setQuery] = useState<BasicQuery>({
      page: 0,                
      limit: 10,              
      order: "asc",
      orderBy: "name",
      search: "",
    });

  const ClientPage = () => {
  const headCells: HeadCell<Client>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
    { id: "address", numeric: false, disablePadding: false, label: "Address" },
  ];

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };
    const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };


  const handleAddClient = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateClient = async (data: any) => {
    try {
      await clientService.createClient(data);
      fetchClients();
    } catch (err) {
      console.error("Failed to create client:", err);
    }
    setOpenDialog(false);
  };

  async function fetchClients() {
    const fetchedClients = await clientService.getClients();
    setClients(fetchedClients);
    setTotalCount(fetchedClients.total); 
  }

    // Handlers


  useEffect(() => {
    fetchClients();
  }, [query]);

  return (
    <div>
      <ClientFilterAdd
          search={query.search}
        setSearch={handleSearchChange}
        onAddClient={handleAddClient}
      />
      <EnhancedTable<Client>
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
        rows={clients}
        headCells={headCells}
        id="_id"
        totalCount={totalCount}  
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
