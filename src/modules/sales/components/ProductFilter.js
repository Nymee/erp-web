import { jsx as _jsx } from "react/jsx-runtime";
import { Plus } from "lucide-react";
const ProductFilter = ({ search, setSearch }) => {
    return (_jsx("div", { className: "flex items-center justify-between gap-4 mb-4", children: _jsx("input", { type: "text", placeholder: "Search Product", value: search, onChange: (e) => setSearch(e.target.value), className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }) }));
};
export default ProductFilter;
