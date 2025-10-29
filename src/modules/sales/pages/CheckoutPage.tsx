import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import salesService from "../salesService";
import { useParams } from "react-router-dom";

interface SelectedProduct {
  _id: string;
  name: string;
  cost_price: number;
  retail_margin: number;
  discount?: number;
  quantity?: number;
  sales_price: number;
  gst: number;
  cess: number;
  productId: string;
}

const CheckoutPage = () => {
  const { sales_id } = useParams();
  const location = useLocation();
  const { clientId, products: initialProducts } = location.state || {
    clientId: null,
    products: [],
  };

  const [products, setProducts] = useState<SelectedProduct[]>(initialProducts);
  console.log(products, "prodoooooo");
  const [so_discount, setSoDiscount] = useState<number>(0);

  const navigate = useNavigate();

  const calculateSalesPrice = (p: SelectedProduct) => {
    const cost = Number(p.cost_price);
    const margin = Number(p.retail_margin ?? 0);
    const discount = Number(p.discount ?? 0);
    const gst = Number(p.gst ?? 0);
    const cess = Number(p.cess ?? 0);
    const qty = Number(p.quantity ?? 1);

    // Step 1: Apply margin
    const priceAfterMargin = cost + margin;

    // Step 2: Apply discount
    const priceAfterDiscount = priceAfterMargin - discount;

    // Step 3: Apply GST and CESS (both are percentages)
    const gstAmount = (priceAfterDiscount * gst) / 100;
    const cessAmount = (priceAfterDiscount * cess) / 100;
    const priceAfterTax = priceAfterDiscount + gstAmount + cessAmount;

    // Step 4: Multiply by quantity
    const total = Number((priceAfterTax * qty).toFixed(2));

    return total;
  };

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

  const productsWithSales = products.map((p) => ({
    ...p,
    sales_price: calculateSalesPrice(p),
    quantity: p.quantity || 1,
  }));

  const subtotal = productsWithSales.reduce((sum, p) => sum + p.sales_price, 0);
  const grandTotal = subtotal - so_discount;

  const handleSave = (asOrder: boolean) => {
    const payload = {
      clientId,
      type: asOrder ? "order" : "estimation",
      so_discount,
      so_discount_type: "rup",
      products: productsWithSales.map((p) => ({
        productId: sales_id ? p.productId : p._id,
        quantity: p.quantity,
        retail_margin: p.retail_margin,
        retail_margin_type: "rup",
        discount: p.discount,
        discount_type: p.discount != null ? "rup" : undefined,
        gst: p.gst || 0,
        cess: p.cess || 0,
      })),
    };
    if (sales_id) {
      handleUpdate(payload, sales_id);
    } else {
      handleCreate(payload);
    }
  };

  const handleCreate = async (payload: any) => {
    const res = await salesService.createSales(payload);
    if (res) navigate("/sales/all");
  };

  const handleUpdate = async (payload: any, sales_id: string) => {
    payload.price_update = false;
    const res = await salesService.updateSales(payload, sales_id);
    if (res) navigate("/sales/all");
  };

  return (
    <div className="m in-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>
            <p className="text-gray-500">
              Finalize and confirm your sales order
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-800 text-left uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Cost Price</th>
                  <th className="px-5 py-3">Retail Margin (₹)</th>
                  <th className="px-5 py-3">Discount (₹)</th>
                  <th className="px-5 py-3">GST (%)</th>
                  <th className="px-5 py-3">Cess (%)</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3 text-right">Sales Price</th>
                </tr>
              </thead>
              <tbody>
                {productsWithSales.map((p, i) => (
                  <tr
                    key={i}
                    className={`border-t hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-5 py-3 font-semibold">{p.name}</td>
                    <td className="px-5 py-3">₹{p.cost_price.toFixed(2)}</td>

                    {/* Retail Margin */}
                    <td className="px-5 py-3">
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
                        className="w-24 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </td>

                    {/* Discount */}
                    <td className="px-5 py-3">
                      <input
                        type="number"
                        value={p.discount ?? ""}
                        onChange={(e) =>
                          handleProductChange(i, "discount", e.target.value)
                        }
                        placeholder="0"
                        className="w-24 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </td>

                    {/* GST */}
                    <td className="px-5 py-3 text-gray-600">
                      {p.gst ? `${p.gst}%` : "—"}
                    </td>

                    {/* Cess */}
                    <td className="px-5 py-3 text-gray-600">
                      {p.cess ? `${p.cess}%` : "—"}
                    </td>

                    {/* Quantity */}
                    <td className="px-5 py-3">
                      <input
                        type="number"
                        min={1}
                        value={p.quantity ?? 1}
                        onChange={(e) =>
                          handleProductChange(i, "quantity", e.target.value)
                        }
                        className="w-20 border border-gray-300 px-3 py-1.5 rounded-lg text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </td>

                    {/* Sales Price */}
                    <td className="px-5 py-3 text-right font-semibold text-blue-700">
                      ₹{p.sales_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Final Discount */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Final Discount
            </h3>
            <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
              <label className="text-gray-700 font-medium">
                Additional Discount (₹):
              </label>
              <input
                type="number"
                value={so_discount}
                onChange={(e) => setSoDiscount(Number(e.target.value))}
                className="w-28 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              {so_discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Final Discount</span>
                  <span>-₹{so_discount.toFixed(2)}</span>
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-800">Grand Total</span>
                <span className="font-bold text-blue-700">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                onClick={() => handleSave(true)}
              >
                Save as Order
              </button>
              <button
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                onClick={() => handleSave(false)}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
