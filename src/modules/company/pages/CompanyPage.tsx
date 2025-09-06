import EnhancedTable from "../../../shared/components/Table";
import type {
  CompanyStatusUpdate,
  HeadCell,
} from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import companyService from "../services/companyService";
import { IconButton } from "@mui/material";
import ConfirmationPopup from "../../../shared/components/ConfirmationPopup";
import type { approveCompany } from "../../../interfaces/interfaces";
interface Company {
  id: number;
  name: string;
  email_id: string;
  mobile: string;
}

type ActionType = "approve" | "reject" | null;

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
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [action, setAction] = useState<ActionType>(null);
  const [selectedRow, setSelectedRow] = useState<Company | null>(null);

  async function fetchCompanies() {
    const fetchedCompanies = await companyService.getCompanies();
    setCompanies(fetchedCompanies);
  }

  const getProps = (status: string | null) => {
    if (status == "approve") {
      return {
        title: "Reject Company",
        message: "Are you sure you want to reject this company?",
      };
    } else if (status == "reject") {
      return {
        title: "Approve Company",
        message: "Are you sure you want to approve this company?",
      };
    }
  };

  const handleConfirm = () => {
    let body = null;
    if (action == "approve") {
      body = {
        isVerified: "approved" as approveCompany,
      };
    } else if (action == "reject") {
      body = {
        isVerified: "rejected" as approveCompany,
      };
    }
    if (selectedRow && body) {
      const res = companyService.statusUpdateCompany(selectedRow.id, body);
    } else {
      console.error("selectedRow or body is null or undefined");
    }
  };

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
        rows={companies}
        headCells={headCells}
        id="id"
        renderAction={(row) => (
          <div className="flex gap-2">
            <IconButton
              color="success"
              onClick={() => {
                setSelectedRow(row);
                setAction("approve");
                setOpenDialog(true);
              }}
            >
              ✔
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setSelectedRow(row);
                setAction("reject");
                setOpenDialog(true);
              }}
            >
              ✖
            </IconButton>
          </div>
        )}
      />

      <ConfirmationPopup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        message={message}
        title={title}
        onConfirm={handleConfirm}
        {...getProps(action)}
      ></ConfirmationPopup>
    </div>
  );
};

export default CompanyPage;
