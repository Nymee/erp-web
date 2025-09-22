const apiUrl = import.meta.env.VITE_API_URL;
const getProducts = (query) => {
    const url = `${apiUrl}/api/product?page=${query.page + 1}&limit=${query.limit}&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;
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
const createProduct = (data) => {
    const url = `${apiUrl}/api/product`;
    const product = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create product");
        }
        return res.json();
    })
        .catch((err) => {
        throw err;
    });
    return product;
};
export default { getProducts, createProduct };
