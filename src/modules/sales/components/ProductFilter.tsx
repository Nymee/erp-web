import { Plus } from "lucide-react";
import type { FilterProps } from "../../../interfaces/interfaces";

const ProductFilter= ({ search, setSearch }: FilterProps) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ProductFilter;
