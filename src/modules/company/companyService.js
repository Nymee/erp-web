const apiUrl = import.meta.env.VITE_API_URL;
const statusUpdateCompany = async (company_id, body) => {
    try {
        const res = await fetch(`${apiUrl}/api/company/status_update/${company_id}`, {
            method: "PUT",
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
    }
    catch (err) {
        throw err;
    }
};
const getCompanies = (query, isVerified) => {
    const url = `${apiUrl}/api/company?page=${query.page + 1}&limit=${query.limit}&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}${isVerified ? `&isVerified=${isVerified}` : ""}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch companies");
        }
        return res.json();
    })
        .catch((err) => {
        throw err;
    });
};
export default { statusUpdateCompany, getCompanies };
