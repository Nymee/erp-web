import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { Plus } from "lucide-react";
import productService from "../../products/productService";
import { getSuppliers } from "../../supplier/services/supplierService";

interface InventoryAddFormProps {
  onAdd: (data: {
    productId: string;
    supplierId: string;
    quantity: number;
    created_date: number; // new field in seconds
  }) => void;
}

interface Product {
  _id: string;
  name: string;
}

interface Supplier {
  _id: number;
  name: string;
}

const InventoryAddForm: React.FC<InventoryAddFormProps> = ({ onAdd }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    last_updated_date: "", // date in YYYY-MM-DD format
  });

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productService.getProducts({
        page: 0,
        limit: 1000,
        order: "asc",
        orderBy: "name",
        search: "",
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { product_id, supplier_id, quantity, last_updated_date } = formData;
    if (product_id && supplier_id && quantity && last_updated_date) {
      // Convert selected date to epoch seconds
      const epochSeconds = Math.floor(new Date(last_updated_date).getTime() / 1000);

      onAdd({
        productId: product_id,
        supplierId: supplier_id,
        quantity: parseInt(quantity),
        created_date: epochSeconds,
      });

      setFormData({ product_id: "", supplier_id: "", quantity: "", last_updated_date: "" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl shadow-lg border border-blue-200 p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-4">
        Add Inventory Item
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
        {/* Product Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Product</InputLabel>
          <Select
            value={formData.product_id}
            label="Product"
            onChange={(e) =>
              setFormData({ ...formData, product_id: e.target.value })
            }
          >
            <MenuItem value="">
              <em>Select Product</em>
            </MenuItem>
            {products.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Supplier Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Supplier</InputLabel>
          <Select
            value={formData.supplier_id}
            label="Supplier"
            onChange={(e) =>
              setFormData({ ...formData, supplier_id: e.target.value })
            }
          >
            <MenuItem value="">
              <em>Select Supplier</em>
            </MenuItem>
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Quantity Input */}
        <TextField
          size="small"
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          sx={{ width: 120 }}
          inputProps={{ min: 1 }}
        />

        {/* Date Picker */}
        <TextField
          size="small"
          label="Date"
          type="date"
          value={formData.last_updated_date}
          onChange={(e) =>
            setFormData({ ...formData, last_updated_date: e.target.value })
          }
          sx={{ width: 180 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          startIcon={<Plus size={18} />}
          sx={{
            background: "linear-gradient(to right, #1e3a8a, #1e40af)",
            textTransform: "none",
            fontWeight: 500,
            padding: "8px 24px",
            "&:hover": {
              background: "linear-gradient(to right, #1e40af, #1e3a8a)",
            },
          }}
        >
          Add Item
        </Button>
      </form>
    </div>
  );
};

export default InventoryAddForm;
