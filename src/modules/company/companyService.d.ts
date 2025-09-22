import type { BasicQuery, CompanyStatusUpdate } from "../../interfaces/interfaces";
declare const _default: {
    statusUpdateCompany: (company_id: string | number | null, body: CompanyStatusUpdate) => Promise<any>;
    getCompanies: (query: BasicQuery, isVerified?: string) => Promise<any>;
};
export default _default;
