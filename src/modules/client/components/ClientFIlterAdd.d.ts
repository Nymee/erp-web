interface ClientFilterProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onAddClient?: () => void;
}
declare const ClientFilterAdd: ({ search, setSearch, onAddClient }: ClientFilterProps) => import("react/jsx-runtime").JSX.Element;
export default ClientFilterAdd;
