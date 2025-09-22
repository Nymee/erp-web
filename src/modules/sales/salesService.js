const apiUrl = import.meta.env.VITE_API_URL;
const getSalesProducts = (query) => {
    const url = `${apiUrl}/api/sales/product?page=${query.page + 1}&limit=${query.limit}&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;
    const products = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        return res.json();
    })
        .catch((err) => {
        throw err;
    });
    return products;
};
export default { getSalesProducts };
