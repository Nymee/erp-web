import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import salesService from "../salesService";

interface SelectedProduct {
  _id: string;
  name: string;
  cost_price: number;
  retail_margin: number;
  discount?: number;
  quantity?: number;
  sales_price: number;
}

const CheckoutPage = () => {
  const location = useLocation();
  const { clientId, products: initialProducts } = location.state || {
    clientId: null,
    products: [],
  };

  const [products, setProducts] = useState<SelectedProduct[]>(initialProducts);
  const [so_discount, setSoDiscount] = useState<number>(0);

  console.log(initialProducts, "gawrddd");
  const navigate = useNavigate();

  /** Calculate sales price for a single product (with quantity) */
  const calculateSalesPrice = (p: SelectedProduct) => {
    const cost = Number(p.cost_price);
    const margin = Number(p.retail_margin ?? 0);
    const discount = Number(p.discount ?? 0);
    const qty = Number(p.quantity ?? 1);

    // All margin/discounts are rupee-based
    const priceAfterMargin = cost + margin;
    const priceAfterDiscount = priceAfterMargin - discount;

    const total = Number((priceAfterDiscount * qty).toFixed(2));
    return total;
  };

  /** Handle changes to product input fields */
  const handleProductChange = (
    index: number,
    field: keyof SelectedProduct,
    value: string | number
  ) => {
    const updated = [...products];
    updated[index][field] = Number(value) as never;
    updated[index].sales_price = calculateSalesPrice(updated[index]);
    setProducts(updated);
  };

  /** Update computed sales prices */
  const productsWithSales = products.map((p) => ({
    ...p,
    sales_price: calculateSalesPrice(p),
    quantity: p.quantity || 1,
  }));

  /** Subtotal */
  const subtotal = productsWithSales.reduce((sum, p) => sum + p.sales_price, 0);

  /** Grand total after final discount */
  const grandTotal = subtotal - so_discount;

  /** Handle save */
  const handleSave = async (asOrder: boolean) => {
    const payload = {
      clientId: clientId,
      type: asOrder ? "order" : "estimation",
      so_discount,
      so_discount_type: "rup",
      products: productsWithSales.map((p) => ({
        productId: p._id,
        quantity: p.quantity,
        retail_margin: p.retail_margin,
        retail_margin_type: "rup",
        discount: p.discount,
        discount_type: p.discount != null ? "rup" : undefined,
      })),
    };
    console.log("Payload:", payload);

    const res = await salesService.createSales(payload);
    if (res) {
      navigate("/sales/all");
    }
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
                    Retail Margin (₹)
                  </th>
                  <th className="px-4 py-4 text-left font-semibold">
                    Discount (₹)
                  </th>
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
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="px-4 py-4 text-gray-700 font-medium">
                      ₹{p.cost_price}
                    </td>

                    {/* Retail Margin */}
                    <td className="px-4 py-4">
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-500">₹</span>
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
                          className="w-24 pl-7 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-4">
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={p.discount ?? ""}
                          onChange={(e) =>
                            handleProductChange(i, "discount", e.target.value)
                          }
                          className="w-24 pl-7 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="0"
                        />
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        min={1}
                        value={p.quantity ?? 1}
                        onChange={(e) =>
                          handleProductChange(i, "quantity", e.target.value)
                        }
                        className="w-20 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center font-medium"
                      />
                    </td>

                    {/* Sales Price */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-blue-600">
                          ₹{p.sales_price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          (₹
                          {((p.sales_price || 0) / (p.quantity || 1)).toFixed(
                            2
                          )}{" "}
                          × {p.quantity})
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Discount & Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Final Discount */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Final Discount
              </h3>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <label className="font-medium text-blue-800">
                  Additional Discount:
                </label>
                <div className="relative">
                  <span className="absolute left-3 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={so_discount}
                    onChange={(e) => setSoDiscount(Number(e.target.value))}
                    className="w-24 pl-7 border border-blue-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
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
                {so_discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Final Discount:
                    </span>
                    <span className="text-red-600 font-semibold">
                      -₹{so_discount.toFixed(2)}
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

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  onClick={() => handleSave(true)}
                >
                  Save as Order
                </button>

                <button
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  onClick={() => handleSave(false)}
                >
                  Save as Estimation
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
