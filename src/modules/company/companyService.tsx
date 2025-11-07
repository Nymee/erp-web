import type {
  BasicQuery,
  CompanyStatusUpdate,
} from "../../interfaces/interfaces";
import { apiClient } from "../../lib/axios";

const statusUpdateCompany = async (
  company_id: string | number | null,
  body: CompanyStatusUpdate
) => {
  const response = await apiClient.put(
    `/api/company/status_update/${company_id}`,
    body
  );
  return response.data;
};

const getCompanies = async (query: BasicQuery, isVerified?: string) => {
  const params: any = {
    page: query.page + 1,
    limit: query.limit,
    order: query.order,
    orderBy: query.orderBy,
    search: query.search,
  };

  if (isVerified) {
    params.isVerified = isVerified;
  }

  const response = await apiClient.get(`/api/company`, { params });
  return response.data;
};

export default { statusUpdateCompany, getCompanies };
