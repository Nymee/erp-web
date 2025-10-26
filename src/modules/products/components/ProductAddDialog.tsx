import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import type { DialogProps } from "../../../interfaces/interfaces";

type ProductForm = {
  name: string;
  cost_price: number;
  retail_margin: number;
  min_margin: number;
  max_margin: number;
  discount: number;
  gst: number;
  cess: number;
  margin_unit: "rup" | "per";
};

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Product name is required"),
  cost_price: yup.number().required("Base price is required").min(0, "Base price must be positive"),
  retail_margin: yup
    .number()
    .required("Markup is required")
    .min(0, "Markup must be positive"),
  min_margin: yup.number().required("Minimum markup is required").min(0),
  max_margin: yup.number().required("Maximum markup is required").min(0),
  discount: yup.number().min(0, "Discount cannot be negative").required("Discount is required"),
  gst: yup.number().min(0, "GST cannot be negative").required("GST is required"),
  cess: yup.number().min(0, "Cess cannot be negative").required("Cess is required"),
  margin_unit: yup.string().oneOf(["rup", "per"]).required("Margin unit is required"),
});

const ProductAddDialog = ({ open, onClose, onSubmit }: DialogProps) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      cost_price: 0,
      retail_margin: 0,
      min_margin: 0,
      max_margin: 0,
      discount: 0,
      gst: 0,
      cess: 0,
      margin_unit: "rup",
    },
  });

  // Live watched fields - Convert to numbers explicitly
  const cost_price = Number(watch("cost_price")) || 0;
  const retail_margin = Number(watch("retail_margin")) || 0;
  const min_margin = Number(watch("min_margin")) || 0;
  const max_margin = Number(watch("max_margin")) || 0;
  const discount = Number(watch("discount")) || 0;
  const gst = Number(watch("gst")) || 0;
  const cess = Number(watch("cess")) || 0;

  // Derived states
  const [taxablePrice, setTaxablePrice] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [marginError, setMarginError] = useState<string | null>(null);

  // Calculations (always in Rs now)
  useEffect(() => {
    // Base Price + Markup
    let retailPrice = cost_price + retail_margin;

    // Validate retail margin lies between min and max
    if (retail_margin < min_margin || retail_margin > max_margin) {
      setMarginError("Markup must be between minimum and maximum markup");
    } else {
      setMarginError(null);
    }

    // Apply discount (in Rs)
    let finalPrice = retailPrice - discount;

    setTaxablePrice(finalPrice);

    // Sales price with GST + CESS
    const sales = finalPrice + (finalPrice * (gst + cess)) / 100;
    setSalesPrice(sales);
  }, [cost_price, retail_margin, discount, gst, cess, min_margin, max_margin]);

  const handleFormSubmit = (data: ProductForm) => {
    if (marginError) return; // Prevent submission if margin validation fails
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent dividers>
        <form id="product-form" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Product Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Base Price */}
          <Controller
            name="cost_price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Base Price (₹)"
                type="number"
                fullWidth
                error={!!errors.cost_price}
                helperText={errors.cost_price?.message}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />

          {/* Markup */}
          <Controller
            name="retail_margin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Markup (₹)"
                type="number"
                fullWidth
                error={!!errors.retail_margin || !!marginError}
                helperText={errors.retail_margin?.message || marginError}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />

          {/* Min & Max Markup */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="min_margin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Min Markup (₹)"
                  type="number"
                  fullWidth
                  error={!!errors.min_margin}
                  helperText={errors.min_margin?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <Controller
              name="max_margin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Max Markup (₹)"
                  type="number"
                  fullWidth
                  error={!!errors.max_margin}
                  helperText={errors.max_margin?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
          </Box>

          {/* Discount */}
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Discount (₹)"
                type="number"
                fullWidth
                error={!!errors.discount}
                helperText={errors.discount?.message}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />

          {/* Pre-Tax Amount - Read Only (MOVED BEFORE GST/CESS) */}
          <TextField
            margin="dense"
            label="Pre-Tax Amount"
            value={taxablePrice.toFixed(2)}
            fullWidth
            disabled
            sx={{ backgroundColor: '#f5f5f5' }}
          />

          {/* GST & Cess */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="gst"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="GST (%)"
                  type="number"
                  fullWidth
                  error={!!errors.gst}
                  helperText={errors.gst?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
            <Controller
              name="cess"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Cess (%)"
                  type="number"
                  fullWidth
                  error={!!errors.cess}
                  helperText={errors.cess?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              )}
            />
          </Box>

          {/* Final Selling Price - Read Only */}
          <TextField
            margin="dense"
            label="Final Selling Price"
            value={salesPrice.toFixed(2)}
            fullWidth
            disabled
            sx={{ backgroundColor: '#f5f5f5' }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="product-form"
          variant="contained"
          disabled={!!marginError}
        >
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductAddDialog;