import type { BasicQuery } from "../../interfaces/interfaces";
import { apiClient } from "../../lib/axios";

const getUsers = async (query: BasicQuery) => {
  const response = await apiClient.get(`/api/user`, {
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

const createUsers = async (data: any) => {
  const response = await apiClient.post(`/api/user`, data);
  return response.data;
};

export default { getUsers, createUsers };
