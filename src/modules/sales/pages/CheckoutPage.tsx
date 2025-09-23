import { useState } from "react";
import { useLocation } from "react-router-dom";

type MarginUnit = "rup" | "per";

interface SelectedProduct {
  name: string;
  cost_price: number;
  retail_margin: number;
  margin_unit: MarginUnit;
  discount: number;
  discount_unit: MarginUnit;
  retail_margin_type: MarginUnit;
  discount_type: MarginUnit;
  gst: number;
  cess: number;
  sales_price: number;
  quantity?: number;
  _id: string;
}

const CheckoutPage = () => {
  // Mock initial products for demo

  const location = useLocation();
  const { products: initialProducts } = location.state || { products: [] };
  console.log("initialProducts", initialProducts);

  const [products, setProducts] = useState<SelectedProduct[]>(initialProducts);
  const [finalDiscount, setFinalDiscount] = useState<number>(0);
  const [finalDiscountUnit, setFinalDiscountUnit] = useState<MarginUnit>("rup");

  /** Calculate unit price for one product (without quantity) */
  const calculateUnitPrice = (p: SelectedProduct) => {
    const cost_price = Number(p.cost_price);
    const retail_margin = Number(p.retail_margin ?? 0);
    const gst = Number(p.gst ?? 0);
    const cess = Number(p.cess ?? 0);

    const retail_margin_unit = p.retail_margin_type;
    const discount_unit = p.discount_type;
    const discount = Number(p.discount ?? 0);

    // Retail margin price
    let retailMarginPrice = 0;
    if (retail_margin_unit === "per") {
      retailMarginPrice = Number(
        (cost_price + (cost_price * retail_margin) / 100).toFixed(2)
      );
    } else {
      retailMarginPrice = Number((cost_price + retail_margin).toFixed(2));
    }

    // Discount amount
    let discountAmt = 0;
    if (discount_unit === "per") {
      discountAmt = Number(((retailMarginPrice * discount) / 100).toFixed(2));
    } else {
      discountAmt = Number(discount.toFixed(2));
    }

    // Discount price
    const discountPrice = Number((retailMarginPrice - discountAmt).toFixed(2));

    // Add GST + Cess
    const totalTaxRate = gst + cess;
    const unitPrice = Number(
      (discountPrice + (discountPrice * totalTaxRate) / 100).toFixed(2)
    );

    return unitPrice;
  };

  /** Calculate total sales price (unit price * quantity) */
  const calculateSalesPrice = (p: SelectedProduct) => {
    const unitPrice = calculateUnitPrice(p);
    const quantity = Number(p.quantity ?? 1);
    return Number((unitPrice * quantity).toFixed(2));
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
    retail_margin_type: p.margin_unit,
    discount_type: p.margin_unit,
    quantity: p.quantity || 1,
  }));

  /** Subtotal */
  const subtotal = productsWithSales.reduce((sum, p) => sum + p.sales_price, 0);

  /** Apply final discount */
  const grandTotal =
    finalDiscountUnit === "rup"
      ? subtotal - finalDiscount
      : subtotal - subtotal * (finalDiscount / 100);

  const handleSave = async (type: string) => {
    const products = productsWithSales.map((p) => {
      return {
        productId: p._id,
        quantity: p.quantity,
        retail_margin: p.retail_margin,
        discount: p.discount,
        gst: p.gst,
        cess: p.cess,
        retail_margin_type: p.retail_margin_type,
        discount_type: p.discount_type,
        clientId: localStorage.getItem("client_id"),
      };
    });
    const requestBody = {
      products: products,
      so_discount: finalDiscount,
      so_discount_type: finalDiscountUnit,
      type: type,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Checkout</h2>
          <p className="text-blue-600">Review and finalize your order</p>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">
                    Product Name
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Cost Price
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Retail Margin
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Discount
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">GST</th>
                  <th className="px-4 py-4 text-left font-semibold">Cess</th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Sales Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsWithSales.map((p, i) => (
                  <tr
                    key={i}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{p.name}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-700">
                        ₹{p.cost_price}
                      </span>
                    </td>

                    {/* Retail margin */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={p.retail_margin}
                          onChange={(e) =>
                            handleProductChange(
                              i,
                              "retail_margin",
                              e.target.value
                            )
                          }
                          className="w-20 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <select
                          value={p.margin_unit}
                          onChange={(e) =>
                            handleProductChange(
                              i,
                              "margin_unit",
                              e.target.value
                            )
                          }
                          className="border border-blue-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="rup">Rs</option>
                          <option value="per">%</option>
                        </select>
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={p.discount}
                          onChange={(e) =>
                            handleProductChange(i, "discount", e.target.value)
                          }
                          className="w-20 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <select
                          value={p.discount_unit}
                          onChange={(e) =>
                            handleProductChange(
                              i,
                              "discount_unit",
                              e.target.value
                            )
                          }
                          className="border border-blue-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="rup">Rs</option>
                          <option value="per">%</option>
                        </select>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {p.gst}%
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {p.cess}%
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="number"
                          min={1}
                          value={p.quantity ?? 1}
                          onChange={(e) =>
                            handleProductChange(i, "quantity", e.target.value)
                          }
                          className="w-20 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center font-medium"
                        />
                      </div>
                    </td>

                    {/* Sales Price */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{p.sales_price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          (₹{calculateUnitPrice(p).toFixed(2)} × {p.quantity})
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final discount and totals */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Final Discount */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Final Discount
              </h3>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <label className="font-medium text-blue-800">
                  Additional Discount:
                </label>
                <input
                  type="number"
                  value={finalDiscount}
                  onChange={(e) => setFinalDiscount(Number(e.target.value))}
                  className="w-24 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
                <select
                  value={finalDiscountUnit}
                  onChange={(e) =>
                    setFinalDiscountUnit(e.target.value as MarginUnit)
                  }
                  className="border border-blue-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="rup">Rs</option>
                  <option value="per">%</option>
                </select>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal:</span>
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                {finalDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Final Discount:
                    </span>
                    <span className="text-red-600 font-semibold">
                      -
                      {finalDiscountUnit === "rup"
                        ? `₹${finalDiscount.toFixed(2)}`
                        : `${finalDiscount}%`}
                    </span>
                  </div>
                )}
                <hr className="border-blue-200" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-800">
                    Grand Total:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave("order")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Save as Order
                </button>
                <button
                  onClick={handleSave("estimation")}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Save as Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
