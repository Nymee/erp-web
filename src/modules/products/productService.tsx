import type { BasicQuery } from "../../interfaces/interfaces";
import { apiClient } from "../../lib/axios";

const getProducts = async (query: BasicQuery) => {
  const response = await apiClient.get(`/api/product`, {
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

const createProduct = async (data: any) => {
  const response = await apiClient.post(`/api/product`, data);
  return response.data;
};

export default { getProducts, createProduct };
