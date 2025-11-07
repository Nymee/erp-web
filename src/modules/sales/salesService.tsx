import type { BasicQuery } from "../../interfaces/interfaces";
import { apiClient } from "../../lib/axios";

const getSalesProducts = async (query: BasicQuery) => {
  const response = await apiClient.get(`/api/sales/product`, {
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

const createSales = async (payload: any) => {
  const response = await apiClient.post(`/api/sales`, payload);
  return response.data;
};

const updateSales = async (payload: any, sales_id: string) => {
  const response = await apiClient.put(`/api/sales/${sales_id}`, payload);
  return response.data;
};

const getSales = async (query: BasicQuery, type?: string) => {
  const params: any = {
    page: query.page + 1,
    limit: query.limit,
    order: query.order,
    orderBy: query.orderBy,
  };

  if (query.search) {
    params.search = query.search;
  }

  if (type) {
    params.type = type;
  }

  const response = await apiClient.get(`/api/sales`, { params });
  return response.data;
};

const getSalesById = async (sales_id?: string) => {
  const response = await apiClient.get(`/api/sales/${sales_id}`);
  return response.data;
};

export default {
  getSalesProducts,
  createSales,
  getSales,
  updateSales,
  getSalesById,
};
