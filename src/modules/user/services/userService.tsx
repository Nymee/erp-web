import type { BasicQuery } from "../../../interfaces/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

const getUsers = (query: BasicQuery) => {
  const url = `${apiUrl}/api/user?page=${query.page + 1}&limit=${query.limit}&order=${query.order}&orderBy=${query.orderBy}&search=${query.search}`;
  const users = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

  return users;
};

const createUsers = (data: any) => {
  const url = `${apiUrl}/api/user`;
  const users = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

export default { getUsers, createUsers };
