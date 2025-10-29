import type { BasicQuery } from "../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

const getSalesProducts = (query: BasicQuery) => {
  const url = `${apiUrl}/api/sales/product?page=${query.page + 1}&limit=${
    query.limit
  }&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;
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

const createSales = (payload: any) => {
  const url = `${apiUrl}/api/sales`;
  const products = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
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

const getSales = (query: BasicQuery, type?:string) => {
  const url = `${apiUrl}/api/sales?page=${query.page + 1}&limit=${
    query.limit
  }&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;

  if(type){
    url.concat(`&type=${type}`);
  }

  const sales = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch sales");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return sales;
};

export default { getSalesProducts, createSales, getSales };
