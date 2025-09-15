import { TextField, Button } from "@mui/material";
import { Plus } from "lucide-react";
import type { FilterProps } from "../../../interfaces/interfaces";

const UserFilterAdd = ({ search, setSearch, onAdd }: FilterProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        gap: "1rem",
      }}
    >
      {/* Search box */}
      <TextField
        id="outlined-controlled"
        label="Search User"
        variant="outlined"
        size="small"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
        style={{ flex: 1 }}
      />

      {/* Add User button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Plus size={18} />}
        onClick={onAdd}
        sx={{ borderRadius: "8px", textTransform: "none" }}
      >
        Add User
      </Button>
    </div>
  );
};

export default UserFilterAdd;
