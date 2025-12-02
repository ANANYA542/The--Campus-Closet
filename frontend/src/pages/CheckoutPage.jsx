import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCard, Wallet, Truck } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const CheckoutPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    upiId: ""
  });

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/products/${itemId}`);
      setItem(res.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill all required fields");
      return;
    }

    if (paymentMethod === "upi" && !formData.upiId) {
      alert("Please enter UPI ID");
      return;
    }

    setProcessing(true);

    try {
      // Simulate API call
      await axios.post("http://localhost:5050/api/orders/place", {
        buyerId: 1, // Hardcoded for demo
        itemId: parseInt(itemId),
        paymentMethod,
        deliveryDetails: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
        upiId: paymentMethod === "upi" ? formData.upiId : null,
        amount: item.price,
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to success page
      navigate("/order-success");
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1423] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0a1423] flex items-center justify-center text-white">
        Item not found
      </div>
    );
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-[#0a1423] flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Processing Your Order...</h2>
        <p className="text-gray-400">Please wait while we confirm your order</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1423] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Hostel name, room number, etc."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                {/* COD */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "cod"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Truck className={paymentMethod === "cod" ? "text-purple-400" : "text-gray-400"} size={24} />
                  <div className="text-left flex-1">
                    <p className="font-semibold text-white">Cash on Delivery</p>
                    <p className="text-sm text-gray-400">Pay when you receive</p>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                {/* UPI */}
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === "upi"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Wallet className={paymentMethod === "upi" ? "text-purple-400" : "text-gray-400"} size={24} />
                  <div className="text-left flex-1">
                    <p className="font-semibold text-white">UPI Payment</p>
                    <p className="text-sm text-gray-400">Pay via UPI ID</p>
                  </div>
                  {paymentMethod === "upi" && (
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                {paymentMethod === "upi" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">UPI ID *</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="yourname@upi"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="mb-6">
                <img
                  src={item.images ? JSON.parse(item.images)[0] : "https://via.placeholder.com/200"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between text-gray-300">
                  <span>Item Price</span>
                  <span>₹{item.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Delivery</span>
                  <span className="text-green-400">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-white mb-6">
                <span>Total</span>
                <span>₹{item.price.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Place Order
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
