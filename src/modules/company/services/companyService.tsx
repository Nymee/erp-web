import type { CompanyStatusUpdate } from "../../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

const statusUpdateCompany = async (
  company_id: string | number | null,
  body: CompanyStatusUpdate
) => {
  try {
    const res = await fetch(`${apiUrl}/api/status_update/${company_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error || "Failed to fetch companies");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};

const getCompanies = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error || "Failed to fetch companies");
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export default { statusUpdateCompany, getCompanies };
