import EnhancedTable from "../../../shared/components/Table";
import type { HeadCell } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import companyService from "../services/companyService";
interface Company {
  id: number;
  name: string;
  email_id: string;
  mobile: string;
}

const CompanyPage = () => {
  const headCells: HeadCell<Company>[] = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "email_id", numeric: false, disablePadding: false, label: "Email" },
    { id: "mobile", numeric: false, disablePadding: false, label: "Mobile" },
  ];

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Company>("name");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  async function fetchCompanies() {
    const fetchedCompanies = await companyService.getCompanies();
    setCompanies(fetchedCompanies);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
  <div className="p-4">
    {/* Search Filter */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name, email, or mobile"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Table */}
    <EnhancedTable<Company>
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
      setRowsPerPage={setRowsPerPage}
      rows={companies}
      headCells={headCells}
      id="id"
    />
  </div>
);

};

export default CompanyPage;
