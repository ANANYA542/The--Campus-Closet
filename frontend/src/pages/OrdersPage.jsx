import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const buyerId = 1; // Hardcoded for demo
      const response = await axios.get(`http://localhost:5050/api/orders/buyer/${buyerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-400" size={20} />;
      case "confirmed":
        return <Package className="text-blue-400" size={20} />;
      case "shipped":
        return <Truck className="text-purple-400" size={20} />;
      case "delivered":
        return <CheckCircle className="text-green-400" size={20} />;
      default:
        return <Package className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "confirmed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "shipped":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "delivered":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1423] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1423] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
          {["all", "pending", "confirmed", "shipped", "delivered"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm capitalize ${
                activeTab === tab
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
            <Package size={64} className="mx-auto mb-4 text-white/20" />
            <p className="text-white/40 text-xl mb-6">No orders found</p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                      <img
                        src={order.item?.images ? JSON.parse(order.item.images)[0] : "https://via.placeholder.com/80"}
                        alt={order.item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">{order.item?.name}</h3>
                      <p className="text-sm text-gray-400">Order #{order.id}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white mb-2">₹{order.amount.toLocaleString()}</p>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">
                    <p><span className="text-gray-300">Payment:</span> {order.paymentMethod === "cod" ? "Cash on Delivery" : "UPI"}</p>
                    {order.deliveryDetails && (
                      <p className="mt-1"><span className="text-gray-300">Deliver to:</span> {order.deliveryDetails.name}</p>
                    )}
                  </div>
                  <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm">
                    View Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
