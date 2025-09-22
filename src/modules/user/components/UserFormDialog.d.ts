import React from "react";
export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}
declare const UserFormDialog: React.FC<DialogProps>;
export default UserFormDialog;
