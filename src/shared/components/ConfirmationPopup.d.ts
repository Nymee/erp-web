import React from "react";
interface ConfirmationPopupProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
    confirmText?: string;
    cancelText?: string;
}
declare const ConfirmationPopup: React.FC<ConfirmationPopupProps>;
export default ConfirmationPopup;
