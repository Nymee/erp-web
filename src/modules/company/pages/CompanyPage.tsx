import EnhancedTable from "../../../shared/components/Table";
import type {
  CompanyStatusUpdate,
  HeadCell,
  BasicQuery,
} from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { IconButton, Tabs, Tab } from "@mui/material";
import ConfirmationPopup from "../../../shared/components/ConfirmationPopup";
import type { approveCompany } from "../../../interfaces/interfaces";
import companyService from "../companyService";

interface Company {
  _id: number;
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

  const [query, setQuery] = useState<BasicQuery>({
    page: 0,
    limit: 10,
    order: "asc",
    orderBy: "name",
    search: "",
  });

  const [selected, setSelected] = useState<Company[]>([]);
  const [dense, setDense] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [tabIndex, setTabIndex] = useState(0); // 0: Approved, 1: Pending, 2: Rejected
  const status = ["approved", "pending", "rejected"];
  const currentStatus = status[tabIndex];

  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [action, setAction] = useState<ActionType>(null);
  const [selectedRow, setSelectedRow] = useState<Company | null>(null);

  // --- Handlers ---
  const handlePageChange = (newPage: number) => {
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (value: string) => {
    setQuery((prev) => ({ ...prev, page: 0, search: value }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const getProps = (status: string | null) => {
    if (status === "approve") {
      return {
        title: "Reject Company",
        message: "Are you sure you want to reject this company?",
      };
    } else if (status === "reject") {
      return {
        title: "Approve Company",
        message: "Are you sure you want to approve this company?",
      };
    }
    return { title: "", message: "" };
  };

  const handleConfirm = async () => {
    let body: CompanyStatusUpdate | null = null;

    if (action === "approve") {
      body = { isVerified: "approved" as approveCompany };
    } else if (action === "reject") {
      body = { isVerified: "rejected" as approveCompany };
    }

    console.log("BLEEEEE", selectedRow, body);

    if (selectedRow && body) {
      try {
        await companyService.statusUpdateCompany(selectedRow._id, body);
        await fetchCompanies();
      } catch (err) {
        console.error("Failed to update company status:", err);
      } finally {
        setOpenDialog(false);
      }
    } else {
      console.error("selectedRow or body is null/undefined");
    }
  };

  async function fetchCompanies() {
    try {
      const res = await companyService.getCompanies(query, currentStatus);
      setCompanies(res.data);
      setTotalCount(res.total);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, [query, tabIndex]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          value={query.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} className="mb-4">
        <Tab label="Approved" />
        <Tab label="Pending" />
        <Tab label="Rejected" />
      </Tabs>

      {/* Search Filter */}

      {/* Table */}
      <EnhancedTable<Company>
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
        rows={companies}
        headCells={headCells}
        id="_id"
        totalCount={totalCount}
        renderAction={(row) =>
          currentStatus === "pending" ? (
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
          ) : null
        }
      />

      <ConfirmationPopup
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        {...getProps(action)}
      />
    </div>
  );
};

export default CompanyPage;
