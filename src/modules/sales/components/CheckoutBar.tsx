import { ArrowRight } from "lucide-react";

interface CheckoutBarProps {
  productCount: number;
  handleCheckout: ()=>void;
}

const CheckoutBar = ({ productCount, handleCheckout }: CheckoutBarProps) => {
    console.log("CheckoutBar received handleCheckout:", typeof handleCheckout, handleCheckout);


  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg rounded-2xl shadow-lg bg-blue-600 text-white px-4 py-3 flex items-center justify-between z-50">
      {/* Checkout button */}
      <button
        onClick={() => {
    console.log("button clicked in CheckoutBar");
    handleCheckout();
  }}

        className="flex items-center gap-2 font-semibold hover:opacity-90 transition"
      >
        <span>Checkout</span>
        <ArrowRight size={18} />
      </button>

      {/* Product productCount */}
      <span className="text-sm font-medium">{productCount} products selected</span>
    </div>
  );
};

export default CheckoutBar;
