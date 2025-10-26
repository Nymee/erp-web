import { Plus, Search } from "lucide-react";
import type { FilterProps } from "../../../interfaces/interfaces";

const ProductFilterAdd = ({ search, setSearch, onAdd }: FilterProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      {/* Compact Search Box - Left */}
      <div className="relative w-72">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Add Product Button - Right */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all shadow-md hover:shadow-lg font-medium"
      >
        <Plus size={18} />
        Add Product
      </button>
    </div>
  );
};

export default ProductFilterAdd;