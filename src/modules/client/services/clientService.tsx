import { apiClient } from "../../../lib/axios";

const getClients = async () => {
  const response = await apiClient.get(`/api/client`);
  return response.data;
};

const createClient = async (data: any) => {
  const response = await apiClient.post(`/api/clients`, data);
  return response.data;
};

export default { getClients, createClient };
