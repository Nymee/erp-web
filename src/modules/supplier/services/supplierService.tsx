const apiUrl = import.meta.env.VITE_API_URL;

export const getSuppliers = () => {
  const url = `${apiUrl}/api/supplier`;
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
      console.log("Suppliers fetched successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching suppliers:", error);
      throw error;
    });
};

export const createSupplier = (data: any) => {
  const url = `${apiUrl}/api/suppliers`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      console.log("Supplier created successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error creating supplier:", error);
      throw error;
    });
};
