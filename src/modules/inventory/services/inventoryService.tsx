import { BasicQuery } from "../../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export const getInventory = () => {
  const url = `${apiUrl}/api/inventory/products`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Inventory fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching inventory:", error);
      throw error;
    });
};
export const getInventoryProducts = (query: BasicQuery) => {
  const url = `${apiUrl}/api/inventory/products?page=${query.page + 1}&limit=${query.limit}&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;

  const inventory = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch inventory");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return inventory;
};


export const createInventory = (data: any) => {
  const url = `${apiUrl}/api/inventory`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Inventory created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error creating inventory:", error);
      throw error;
    });
};
