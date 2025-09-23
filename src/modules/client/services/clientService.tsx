import { BasicQuery } from "../../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

const getClients = (query: BasicQuery) => {
  let url = "";

  if (query.dropdown) {
    url = `${apiUrl}/api/client?dropdown=true`;
  } else {
    url = `${apiUrl}/api/client?page=${query.page + 1}&limit=${
      query.limit
    }&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;
  }

  const clients = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch clients");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return clients;
};

const createClient = (data: any) => {
  const url = `${apiUrl}/api/clients`;
  const client = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create client");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return client;
};

export default { getClients, createClient };
