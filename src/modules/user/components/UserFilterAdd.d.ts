interface UserFilterProps {
    search: string;
    setSearch: (value: string) => void;
    onAdd?: () => void;
}
declare const UserFilterAdd: ({ search, setSearch, onAdd }: UserFilterProps) => import("react/jsx-runtime").JSX.Element;
export default UserFilterAdd;
