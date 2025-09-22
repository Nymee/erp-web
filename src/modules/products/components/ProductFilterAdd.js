import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
const ProductFilterAdd = ({ search, setSearch, onAdd }) => {
    return (_jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [_jsx("input", { type: "text", placeholder: "Search Product", value: search, onChange: (e) => setSearch(e.target.value), className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsxs("button", { onClick: onAdd, className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(Plus, { size: 18 }), "Add Product"] })] }));
};
export default ProductFilterAdd;
