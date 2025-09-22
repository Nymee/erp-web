import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Validation Schema
const schema = yup.object({
    name: yup.string().required("Name is required"),
    cost_price: yup.number().required("Cost price is required").min(0),
    retail_margin: yup
        .number()
        .required("Retail margin is required")
        .min(0, "Must be ≥ 0"),
    min_margin: yup.number().required("Min margin is required"),
    max_margin: yup.number().required("Max margin is required"),
    discount: yup.number().min(0).required(),
    margin_unit: yup.mixed().oneOf(["rs", "%"]).required(),
    gst: yup.number().min(0).required(),
    cess: yup.number().min(0).required(),
});
const ProductAddDialog = ({ open, onClose, onSubmit }) => {
    const { control, handleSubmit, watch, reset, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            cost_price: 0,
            retail_margin: 0,
            min_margin: 0,
            max_margin: 0,
            discount: 0,
            margin_unit: "rs",
            gst: 0,
            cess: 0,
        },
    });
    // Live watched fields
    const cost_price = watch("cost_price");
    const retail_margin = watch("retail_margin");
    const min_margin = watch("min_margin");
    const max_margin = watch("max_margin");
    const discount = watch("discount") || 0;
    const gst = watch("gst") || 0;
    const cess = watch("cess") || 0;
    const margin_unit = watch("margin_unit");
    // Derived states
    const [taxablePrice, setTaxablePrice] = useState(0);
    const [salesPrice, setSalesPrice] = useState(0);
    const [marginError, setMarginError] = useState(null);
    // Calculations
    useEffect(() => {
        let retailPrice = cost_price;
        if (margin_unit === "rs") {
            retailPrice = cost_price + retail_margin;
        }
        else if (margin_unit === "%") {
            retailPrice = cost_price + (cost_price * retail_margin) / 100;
        }
        // Validate retail margin lies between min and max
        if (retail_margin < min_margin || retail_margin > max_margin) {
            setMarginError("Retail margin must be between Min and Max margin");
        }
        else {
            setMarginError(null);
        }
        // Apply discount
        let finalPrice = retailPrice;
        if (margin_unit === "rs") {
            finalPrice = retailPrice - discount;
        }
        else if (margin_unit === "%") {
            finalPrice = retailPrice - (retailPrice * discount) / 100;
        }
        setTaxablePrice(finalPrice);
        // Sales price with GST + CESS
        const sales = finalPrice + (finalPrice * (gst + cess)) / 100;
        setSalesPrice(sales);
    }, [cost_price, retail_margin, discount, gst, cess, margin_unit, min_margin, max_margin]);
    // Reset cost-related fields when margin unit changes
    useEffect(() => {
        reset((prev) => ({
            ...prev,
            cost_price: 0,
            retail_margin: 0,
            min_margin: 0,
            max_margin: 0,
            discount: 0,
        }));
    }, [margin_unit, reset]);
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center", children: _jsxs("div", { className: "bg-white w-full max-w-lg rounded-lg shadow-lg p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-blue-700 mb-4", children: "Create Product" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Controller, { name: "name", control: control, render: ({ field }) => (_jsx("input", { ...field, placeholder: "Product Name", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }), errors.name && (_jsx("p", { className: "text-red-500 text-sm", children: errors.name.message }))] }), _jsx("div", { children: _jsx(Controller, { name: "cost_price", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Cost Price", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }) }), _jsxs("div", { children: [_jsx(Controller, { name: "retail_margin", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Retail Margin", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }), marginError && (_jsx("p", { className: "text-red-500 text-sm", children: marginError }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Controller, { name: "min_margin", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Min Margin", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }), _jsx(Controller, { name: "max_margin", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Max Margin", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) })] }), _jsx("div", { children: _jsx(Controller, { name: "discount", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Discount", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }) }), _jsx("div", { children: _jsx(Controller, { name: "margin_unit", control: control, render: ({ field }) => (_jsxs("select", { ...field, className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "rs", children: "Rs" }), _jsx("option", { value: "%", children: "%" })] })) }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Controller, { name: "gst", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "GST (%)", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) }), _jsx(Controller, { name: "cess", control: control, render: ({ field }) => (_jsx("input", { type: "number", ...field, placeholder: "Cess (%)", className: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })) })] }), _jsx("div", { children: _jsx("input", { value: taxablePrice.toFixed(2), readOnly: true, className: "w-full px-3 py-2 border bg-gray-100 rounded-md", placeholder: "Taxable Price" }) }), _jsx("div", { children: _jsx("input", { value: salesPrice.toFixed(2), readOnly: true, className: "w-full px-3 py-2 border bg-gray-100 rounded-md", placeholder: "Sales Price" }) }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition", children: "Save Product" })] })] }) }));
};
export default ProductAddDialog;
