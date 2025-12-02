import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config/api";

const RentPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${itemId}`);
        setItem(res.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        setProcessing(false);
        return;
      }
      const buyerId = 1;
      const amountOverride = item?.rentPrice || 0;
      const orderRes = await axios.post(`${API_BASE_URL}/api/payments/create-order`, {
        buyerId,
        itemId: parseInt(itemId),
        amountOverride,
        mode: "rent",
      });
      if (!orderRes.data.success) {
        alert("Server error.");
        setProcessing(false);
        return;
      }
      const { amount, id: order_id, currency } = orderRes.data.order;
      const options = {
        key: "rzp_test_YOUR_KEY_HERE",
        amount: amount.toString(),
        currency,
        name: "Campus Closet",
        description: `Rent: ${item.name}`,
        image: "https://your-logo-url.com/logo.png",
        order_id,
        handler: async function () {
          navigate("/success");
        },
        prefill: { name: "Ananya", email: "ananya@example.com", contact: "9999999999" },
        theme: { color: "#0a1628" },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center text-white">Item not found</div>;

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
          <img
            src={item.images ? JSON.parse(item.images)[0] : "https://via.placeholder.com/400"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Rent Checkout</h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Monthly Rent</span>
                <span className="font-medium">₹{(item.rentPrice || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold">
                <span>Total</span>
                <span>₹{(item.rentPrice || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button onClick={handlePayment} disabled={processing} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50">
            {processing ? "Processing..." : "Pay Rent"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
