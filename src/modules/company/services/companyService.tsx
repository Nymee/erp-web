
const apiUrl = import.meta.env.VITE_API_URL;


const approveCompany = async (company_id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/status_update/${company_id}`, {
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
}

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
  }




export default { approveCompany, getCompanies };