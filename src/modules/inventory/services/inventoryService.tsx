import { BasicQuery } from "../../../interfaces/interfaces";
import { apiClient } from "../../../lib/axios";

export const getInventory = async () => {
  try {
    const response = await apiClient.get(`/api/inventory/products`);
    console.log("Inventory fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const getInventoryProducts = async (query: BasicQuery) => {
  const response = await apiClient.get(`/api/inventory/products`, {
    params: {
      page: query.page + 1,
      limit: query.limit,
      order: query.order,
      orderBy: query.orderBy,
      search: query.search,
    },
  });
  return response.data;
};
export const createInventory = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/inventory`, data);
    console.log("Inventory created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};
