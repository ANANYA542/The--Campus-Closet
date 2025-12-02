import { useNavigate } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti or celebration animation could go here
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1423] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-300 mb-8">
          Your order has been confirmed. You can track it in your orders page.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-center gap-3 text-purple-300">
            <Package size={20} />
            <span className="text-sm">Order will be delivered within 2-3 days</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl border border-white/20 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
