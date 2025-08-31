import { TextField, Button } from "@mui/material";
import { Plus } from "lucide-react";

interface ClientFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onAddClient?: () => void;
}

const ClientFilterAdd = ({ search, setSearch, onAddClient }: ClientFilterProps) => {
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
        label="Search Client"
        variant="outlined"
        size="small"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value);
        }}
        style={{ flex: 1 }}
      />

      {/* Add Client button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Plus size={18} />}
        onClick={onAddClient}
        sx={{ borderRadius: "8px", textTransform: "none" }}
      >
        Add Client
      </Button>
    </div>
  );
};

export default ClientFilterAdd;
