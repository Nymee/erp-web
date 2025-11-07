import { apiClient } from "../../../lib/axios";

export const getSuppliers = async () => {
  try {
    const response = await apiClient.get(`/api/supplier`);
    console.log("Suppliers fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};

export const createSupplier = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/supplier`, data);
    console.log("Supplier created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
};
