import React from "react";
interface ClientFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}
declare const ClientFormDialog: React.FC<ClientFormDialogProps>;
export default ClientFormDialog;
