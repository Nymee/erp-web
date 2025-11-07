import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const createSupplierSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  address: yup.string().required("Address is required"),
});

interface SupplierFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const SupplierFormDialog: React.FC<SupplierFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  type FormValues = {
    name: string;
    email_id: string;
    mobile: string;
    address: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(createSupplierSchema),
    defaultValues: {
      name: "",
      email_id: "",
      mobile: "",
      address: "",
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Supplier</DialogTitle>
      <DialogContent dividers>
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Email"
              fullWidth
              error={!!errors.email_id}
              helperText={errors.email_id?.message}
            />
          )}
        />

        {/* Mobile */}
        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Mobile"
              fullWidth
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          )}
        />

        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Address"
              fullWidth
              multiline
              rows={2}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupplierFormDialog;
