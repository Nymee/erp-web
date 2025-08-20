import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema (matches your backend fields)
const createUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  role: yup.string().oneOf(["SAU", "SE", "MG", "ADMIN"]).default("SAU"),
});

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      role: "SAU",
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add User</DialogTitle>
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
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
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

        {/* Role (Dropdown) */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              margin="dense"
              label="Role"
              fullWidth
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="SAU">SAU</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
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

export default UserFormDialog;
