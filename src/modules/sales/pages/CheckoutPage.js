import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const CheckoutPage = () => {
    const location = useLocation();
    const { products: initialProducts } = location.state || { products: [] };
    const [products, setProducts] = useState(initialProducts);
    const [finalDiscount, setFinalDiscount] = useState(0);
    const [finalDiscountUnit, setFinalDiscountUnit] = useState("rup");
    /** Calculate sales price for one product */
    const calculateSalesPrice = (p) => {
        const margin = p.margin_unit === "rup"
            ? p.retail_margin
            : (p.cost_price * p.retail_margin) / 100;
        const discount = p.discount_unit === "rup"
            ? p.discount
            : ((p.cost_price + margin) * p.discount) / 100;
        const basePrice = p.cost_price + margin - discount;
        const gstAmount = (basePrice * p.gst) / 100;
        const cessAmount = (basePrice * p.cess) / 100;
        return basePrice + gstAmount + cessAmount;
    };
    /** Handle product input changes */
    const handleProductChange = (index, field, value) => {
        const updated = [...products];
        if (field === "margin_unit" || field === "discount_unit") {
            updated[index][field] = value;
        }
        else {
            updated[index][field] = Number(value);
        }
        updated[index].sales_price = calculateSalesPrice(updated[index]);
        setProducts(updated);
    };
    /** Keep sales prices updated */
    const productsWithSales = products.map((p) => ({
        ...p,
        sales_price: calculateSalesPrice(p),
    }));
    /** Subtotal */
    const subtotal = productsWithSales.reduce((sum, p) => sum + p.sales_price, 0);
    /** Apply final discount */
    const grandTotal = finalDiscountUnit === "rup"
        ? subtotal - finalDiscount
        : subtotal - subtotal * (finalDiscount / 100);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Checkout" }), _jsxs("table", { className: "w-full border border-gray-300 rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "p-2 text-left", children: "Name" }), _jsx("th", { className: "p-2 text-left", children: "Cost Price" }), _jsx("th", { className: "p-2 text-left", children: "Retail Margin" }), _jsx("th", { className: "p-2 text-left", children: "Discount" }), _jsx("th", { className: "p-2 text-left", children: "GST" }), _jsx("th", { className: "p-2 text-left", children: "Cess" }), _jsx("th", { className: "p-2 text-left", children: "Sales Price" })] }) }), _jsx("tbody", { children: productsWithSales.map((p, i) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-2", children: p.name }), _jsx("td", { className: "p-2", children: p.cost_price }), _jsx("td", { className: "p-2", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "number", value: p.retail_margin, onChange: (e) => handleProductChange(i, "retail_margin", e.target.value), className: "w-20 border px-2 rounded" }), _jsxs("select", { value: p.margin_unit, onChange: (e) => handleProductChange(i, "margin_unit", e.target.value), className: "border rounded px-1", children: [_jsx("option", { value: "rup", children: "Rs" }), _jsx("option", { value: "per", children: "%" })] })] }) }), _jsx("td", { className: "p-2", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "number", value: p.discount, onChange: (e) => handleProductChange(i, "discount", e.target.value), className: "w-20 border px-2 rounded" }), _jsxs("select", { value: p.discount_unit, onChange: (e) => handleProductChange(i, "discount_unit", e.target.value), className: "border rounded px-1", children: [_jsx("option", { value: "rup", children: "Rs" }), _jsx("option", { value: "per", children: "%" })] })] }) }), _jsxs("td", { className: "p-2", children: [p.gst, "%"] }), _jsxs("td", { className: "p-2", children: [p.cess, "%"] }), _jsxs("td", { className: "p-2 font-medium", children: ["\u20B9", p.sales_price.toFixed(2)] })] }, i))) })] }), _jsxs("div", { className: "flex items-center gap-3 mt-4", children: [_jsx("label", { className: "font-medium", children: "Final Discount:" }), _jsx("input", { type: "number", value: finalDiscount, onChange: (e) => setFinalDiscount(Number(e.target.value)), className: "w-24 border px-2 rounded" }), _jsxs("select", { value: finalDiscountUnit, onChange: (e) => setFinalDiscountUnit(e.target.value), className: "border rounded px-1", children: [_jsx("option", { value: "rup", children: "Rs" }), _jsx("option", { value: "per", children: "%" })] })] }), _jsxs("div", { className: "mt-6 text-lg font-semibold", children: ["Subtotal: ", _jsxs("span", { className: "text-gray-700", children: ["\u20B9", subtotal.toFixed(2)] })] }), _jsxs("div", { className: "mt-1 text-lg font-semibold", children: ["Grand Total:", " ", _jsxs("span", { className: "text-blue-600", children: ["\u20B9", grandTotal.toFixed(2)] })] })] }));
};
export default CheckoutPage;
