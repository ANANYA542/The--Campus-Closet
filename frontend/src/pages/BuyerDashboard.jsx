import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Heart,
  Sparkles,
  Settings,
  LogOut,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock user data - replace with actual user from context/auth
  const user = {
    id: 1,
    name: "Ananya",
    role: "Student",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch orders
      const ordersResponse = await axios.get(
        `http://localhost:5050/api/buyer/orders/${user.id}`
      );
      setOrders(ordersResponse.data);

      // Fetch wishlist
      const wishlistResponse = await axios.get(
        `http://localhost:5050/api/products/wishlist/${user.id}`
      );
      setWishlist(wishlistResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "recommendations", label: "Recommendations", icon: Sparkles },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Implement logout logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* User Profile */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur opacity-75"></div>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="relative w-14 h-14 rounded-full border-2 border-white/20"
              />
            </div>
            <div>
              <p className="font-bold text-lg text-white tracking-wide">
                {user.name}
              </p>
              <p className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-100"></div>
                )}
                <Icon
                  size={22}
                  className={`relative z-10 transition-transform group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
                <span className="relative z-10 font-medium tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-gray-400 hover:bg-white/5 hover:text-white rounded-2xl transition-all duration-300"
          >
            <LogOut size={22} />
            <span className="font-medium tracking-wide">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black/10 backdrop-blur-sm">
        <div className="p-10 max-w-7xl mx-auto">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="space-y-10">
              {/* Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
                    Welcome Back, {user.name}
                  </h1>
                  <p className="text-purple-200/60 text-lg font-light">
                    Here is an overview of your marketplace activity.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:-translate-y-1 flex items-center gap-3"
                >
                  <ShoppingBag size={22} />
                  Shop New Arrivals
                </button>
              </div>

              {/* Recent Orders */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveSection("orders")}
                    className="text-purple-400 hover:text-purple-300 text-sm font-semibold tracking-wide uppercase transition-colors"
                  >
                    View All
                  </button>
                </div>

                {loading ? (
                  <LoadingSpinner />
                ) : orders.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex gap-5">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                              <img
                                src={
                                  order.item?.images
                                    ? JSON.parse(order.item.images)[0]
                                    : "https://via.placeholder.com/100"
                                }
                                alt=""
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                                Order #{order.id}
                              </p>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {order.item?.name || "Product"}
                              </h3>
                              <p className="text-white/60 text-sm">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              order.status === "completed"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <p className="text-2xl font-bold text-white">
                            ₹{order.amount}
                          </p>
                          <button
                            onClick={() =>
                              navigate(`/products/${order.item?.id}`)
                            }
                            className="text-sm text-white/80 hover:text-white font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            View Details <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center border border-white/10">
                    <Package size={48} className="mx-auto mb-4 text-white/20" />
                    <p className="text-white/40">No orders yet</p>
                  </div>
                )}
              </div>

              {/* Wishlist Preview */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    Your Wishlist
                  </h2>
                  {wishlist.length > 3 && (
                    <button
                      onClick={() => setActiveSection("wishlist")}
                      className="text-purple-400 hover:text-purple-300 text-sm font-semibold tracking-wide uppercase transition-colors"
                    >
                      View All
                    </button>
                  )}
                </div>
                {loading ? (
                  <LoadingSpinner />
                ) : wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {wishlist.slice(0, 3).map((wishlistItem) => (
                      <ProductCard
                        key={wishlistItem.item.id}
                        product={wishlistItem.item}
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 text-center border border-white/10">
                    <Heart size={48} className="mx-auto mb-4 text-white/20" />
                    <p className="text-white/40">Your wishlist is empty</p>
                  </div>
                )}
              </div>

              {/* Quick Picks / Recommendations */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
                  Recommended for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Study Essentials",
                      price: 25.0,
                      image:
                        "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=200",
                    },
                    {
                      name: "Tech Accessories",
                      price: 42.0,
                      image:
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
                    },
                    {
                      name: "Dorm Decorators",
                      price: 30.0,
                      image:
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-5 hover:bg-white/10 cursor-pointer transition-all group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg mb-1">
                          {item.name}
                        </p>
                        <p className="text-pink-400 font-bold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div>
              <h1 className="text-4xl font-bold mb-8 text-white">My Orders</h1>
              {loading ? (
                <LoadingSpinner />
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={
                            order.item?.images
                              ? JSON.parse(order.item.images)[0]
                              : "https://via.placeholder.com/100"
                          }
                          alt=""
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                        <div>
                          <p className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-1">
                            Order #{order.id}
                          </p>
                          <h3 className="text-xl font-bold text-white">
                            {order.item?.name || "Product"}
                          </h3>
                          <p className="text-2xl font-bold text-white mt-2">
                            ₹{order.amount}
                          </p>
                          <p className="text-sm text-white/50 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                          order.status === "completed"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-20 text-center border border-white/10">
                  <Package size={64} className="mx-auto mb-6 text-white/20" />
                  <p className="text-white/40 text-xl">No orders found</p>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Section */}
          {activeSection === "wishlist" && (
            <div>
              <h1 className="text-4xl font-bold mb-8 text-white">
                My Wishlist
              </h1>
              {loading ? (
                <LoadingSpinner />
              ) : wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlist.map((wishlistItem) => (
                    <ProductCard
                      key={wishlistItem.item.id}
                      product={wishlistItem.item}
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-20 text-center border border-white/10">
                  <Heart size={64} className="mx-auto mb-6 text-white/20" />
                  <p className="text-white/40 text-xl mb-6">
                    Your wishlist is empty
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Other sections placeholders */}
          {activeSection === "recommendations" && (
            <div>
              <h1 className="text-4xl font-bold mb-8 text-white">
                Recommendations
              </h1>
              <p className="text-white/60">
                Personalized recommendations coming soon...
              </p>
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h1 className="text-4xl font-bold mb-8 text-white">
                Account Settings
              </h1>
              <p className="text-white/60">Account settings coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
