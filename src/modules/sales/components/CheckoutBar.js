import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
const CheckoutBar = ({ productCount, handleCheckout }) => {
    console.log("CheckoutBar received handleCheckout:", typeof handleCheckout, handleCheckout);
    return (_jsxs("div", { className: "fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg rounded-2xl shadow-lg bg-blue-600 text-white px-4 py-3 flex items-center justify-between z-50", children: [_jsxs("button", { onClick: () => {
                    console.log("button clicked in CheckoutBar");
                    handleCheckout();
                }, className: "flex items-center gap-2 font-semibold hover:opacity-90 transition", children: [_jsx("span", { children: "Checkout" }), _jsx(ArrowRight, { size: 18 })] }), _jsxs("span", { className: "text-sm font-medium", children: [productCount, " products selected"] })] }));
};
export default CheckoutBar;
