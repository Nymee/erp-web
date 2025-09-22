import { useState } from "react";
import { useLocation } from "react-router-dom";

type MarginUnit = "rup" | "per";

interface SelectedProduct {
  name: string;
  cost_price: number;
  retail_margin: number;
  retail_unit: string;

  margin_unit: MarginUnit;
  discount: number;
  discount_unit: MarginUnit;
  gst: number;
  cess: number;
  sales_price: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const { products: initialProducts } = location.state || { products: [] };

  const [products, setProducts] = useState<SelectedProduct[]>(initialProducts);
  const [finalDiscount, setFinalDiscount] = useState<number>(0);

  const [finalDiscountUnit, setFinalDiscountUnit] = useState<MarginUnit>("rup");

  /** Calculate sales price for one product */
  const calculateSalesPrice = (p: SelectedProduct): number => {
    const margin =
      p.margin_unit === "rup"
        ? p.retail_margin
        : (p.cost_price * p.retail_margin) / 100;

    const discount =
      p.discount_unit === "rup"
        ? p.discount
        : ((p.cost_price + margin) * p.discount) / 100;

    const basePrice = p.cost_price + margin - discount;
    const gstAmount = (basePrice * p.gst) / 100;
    const cessAmount = (basePrice * p.cess) / 100;

    return basePrice + gstAmount + cessAmount;
  };

  /** Handle product input changes */
  const handleProductChange = (
    index: number,
    field: keyof SelectedProduct,
    value: string | number
  ) => {
    const updated = [...products];
    if (field === "margin_unit" || field === "discount_unit") {
      updated[index][field] = value as MarginUnit;
    } else {
      updated[index][field] = Number(value) as never;
    }
    updated[index].sales_price = calculateSalesPrice(updated[index]);
    setProducts(updated);
  };

  /** Keep sales prices updated */
  const productsWithSales = products.map((p) => ({
    ...p,
    sales_price: calculateSalesPrice(p),
    discount_unit: p.margin_unit,
    retail_unit: p.margin_unit,
  }));

  /** Subtotal */
  const subtotal = productsWithSales.reduce((sum, p) => sum + p.sales_price, 0);

  /** Apply final discount */
  const grandTotal =
    finalDiscountUnit === "rup"
      ? subtotal - finalDiscount
      : subtotal - subtotal * (finalDiscount / 100);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      {/* Product Table */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Cost Price</th>
            <th className="p-2 text-left">Retail Margin</th>
            <th className="p-2 text-left">Discount</th>
            <th className="p-2 text-left">GST</th>
            <th className="p-2 text-left">Cess</th>
            <th className="p-2 text-left">Sales Price</th>
          </tr>
        </thead>
        <tbody>
          {productsWithSales.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.cost_price}</td>

              {/* Retail margin */}
              {/* Retail margin */}
              <td className="p-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={p.retail_margin}
                    onChange={(e) =>
                      handleProductChange(i, "retail_margin", e.target.value)
                    }
                    className="w-20 border px-2 rounded"
                  />
                  <select
                    value={p.retail_unit}
                    onChange={(e) =>
                      handleProductChange(i, "retail_unit", e.target.value)
                    }
                    className="border rounded px-1"
                  >
                    <option value="rup">Rs</option>
                    <option value="per">%</option>
                  </select>
                </div>
              </td>

              {/* Discount */}
              <td className="p-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={p.discount}
                    onChange={(e) =>
                      handleProductChange(i, "discount", e.target.value)
                    }
                    className="w-20 border px-2 rounded"
                  />
                  <select
                    value={p.discount_unit}
                    onChange={(e) =>
                      handleProductChange(i, "discount_unit", e.target.value)
                    }
                    className="border rounded px-1"
                  >
                    <option value="rup">Rs</option>
                    <option value="per">%</option>
                  </select>
                </div>
              </td>

              <td className="p-2">{p.gst}%</td>
              <td className="p-2">{p.cess}%</td>
              <td className="p-2 font-medium">₹{p.sales_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Final discount input */}
      <div className="flex items-center gap-3 mt-4">
        <label className="font-medium">Final Discount:</label>
        <input
          type="number"
          value={finalDiscount}
          onChange={(e) => setFinalDiscount(Number(e.target.value))}
          className="w-24 border px-2 rounded"
        />
        <select
          value={finalDiscountUnit}
          onChange={(e) => setFinalDiscountUnit(e.target.value as MarginUnit)}
          className="border rounded px-1"
        >
          <option value="rup">Rs</option>
          <option value="per">%</option>
        </select>
      </div>

      {/* Totals */}
      <div className="mt-6 text-lg font-semibold">
        Subtotal: <span className="text-gray-700">₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="mt-1 text-lg font-semibold">
        Grand Total:{" "}
        <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutPage;
