import React, { useState, useEffect, useContext } from "react";
import { Eye, Package, Edit, X, Trash2, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import sellerService from "../services/sellerService";

export default function SellerDashboard() {
  const { user, token } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState("week");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editForm, setEditForm] = useState({});
  const [products, setProducts] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const [stats, setStats] = useState({
    storeVisits: { value: 0, growth: 0 },
    conversionRate: { value: 0, growth: 0 },
    topProduct: { name: "-", units: 0 },
  });

  const categories = [
    { value: "All", label: "All Categories" },
    { value: "Textbooks", label: "Textbooks" },
    { value: "Electronics", label: "Electronics" },
    { value: "Dorm & Living", label: "Dorm & Living" },
    { value: "Apparel", label: "Apparel" },
    { value: "Stationery", label: "Stationery" },
  ];

  // Chart data for each period
  const chartData = {
    day: "M 0 150 Q 50 120, 100 130 T 200 110 T 300 140 T 400 90 T 500 120 T 600 100 T 700 115",
    week: "M 0 120 Q 50 80, 100 100 T 200 80 T 300 120 T 400 60 T 500 100 T 600 80 T 700 100",
    month: "M 0 140 Q 50 100, 100 90 T 200 70 T 300 100 T 400 50 T 500 80 T 600 60 T 700 70"
  };

  const getSalesData = (period) => {
    const data = {
      day: { total: 685.3, growth: 8.2 },
      week: { total: 4820.5, growth: 12.5 },
      month: { total: 18945.75, growth: 15.8 },
    };
    return data[period];
  };
  const [salesData, setSalesData] = useState(getSalesData("week"));

  const getStockColor = (stock, maxStock) => {
    const percentage = (stock / maxStock) * 100;
    if (percentage > 50) return "bg-green-500";
    if (percentage > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStockPercentage = (stock, maxStock) => {
    if (!maxStock || maxStock === 0) return 100;
    return Math.round((stock / maxStock) * 100);
  };

  // parse images field (supports JSON array or stringified JSON)
  const parseImages = (images) => {
    if (!images) return [];
    try {
      if (Array.isArray(images)) return images;
      if (typeof images === "string") {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      // if stored as JSON type (object) in some setups
      if (typeof images === "object") {
        return Array.isArray(images) ? images : [];
      }
    } catch (e) {
      // fallback: return as single string if that's what it is
      return [images].filter(Boolean);
    }
    return [];
  };

  const normalizeItem = (item) => {
    const images = parseImages(item.images);
    const stock = typeof item.stockQuantity === "number" ? item.stockQuantity : 1;
    const maxStock = Math.max(100, stock);
    return {
      id: item.id,
      name: item.name || item.title || "Unnamed product",
      description: item.description || "",
      category: item.category || "Misc",
      price: item.price ?? item.rentPrice ?? 0,
      rentPrice: item.rentPrice ?? 0,
      stock,
      maxStock,
      condition: item.condition || "Good",
      image: images[0] || "https://via.placeholder.com/300?text=No+Image",
      raw: item,
    };
  };

  const fetchProducts = async () => {
    if (!user?.id) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const items = await sellerService.getSellerItems(user.id, token);
      const mapped = (Array.isArray(items) ? items : []).map(normalizeItem);
      setProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch seller items:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!user?.id) return;
    try {
      const s = await sellerService.getSellerStats(user.id, token);
      setStats((prev) => ({
        storeVisits: { value: s.totalItems ?? prev.storeVisits.value, growth: 0 },
        conversionRate: {
          value:
            Math.round(((s.totalSales ?? 0) / Math.max(1, s.totalItems ?? 1)) * 100) / 100,
          growth: 0,
        },
        topProduct: { name: "-", units: 0 },
      }));
    } catch (err) {
      // stats are optional
      // console.warn("Stats fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    // re-run products fetch when filtering category (client-side filter)
    // keep behavior consistent: we already fetch everything on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSalesData(getSalesData(tab));
    setAnimationKey(prev => prev + 1); // Trigger re-animation
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      condition: product.condition,
      description: product.description,
    });
    setShowEditModal(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;
    const payload = {
      ...selectedProduct.raw,
      name: editForm.name,
      price: parseFloat(editForm.price),
      stockQuantity: parseInt(editForm.stock, 10),
      condition: editForm.condition,
      description: editForm.description,
    };

    try {
      await sellerService.updateItem(selectedProduct.id, payload, token);

      // optimistic UI update - use normalized fields
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? normalizeItem({ ...p.raw, ...payload, stockQuantity: payload.stockQuantity })
            : p
        )
      );
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update item:", err);
      alert("Failed to save changes. See console for details.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await sellerService.deleteItem(productId, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setShowEditModal(false);
      setShowViewModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item. Check console for details.");
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessagesModal(true);
  };

  const handleDeleteMessage = (messageId) => {
    setSelectedMessage(null);
    setShowMessagesModal(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const visibleProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F5F1ED] text-gray-900 p-6">
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .chart-line {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: drawLine 1.5s cubic-bezier(0.47, 0, 0.745, 0.715) forwards;
        }
        .chart-fill {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Let's make some sales!</h1>
          <p className="text-gray-700">Here's what's happening with your store today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* SALES PERFORMANCE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Sales Performance</h2>
                  <div className="text-5xl font-bold mb-1 text-gray-900">
                    ${salesData.total.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      {selectedTab === "day" ? "Today" : selectedTab === "week" ? "This Week" : "This Month"}
                    </span>
                    <span className="text-green-600 font-semibold">+{salesData.growth}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleTabChange("day")}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === "day" ? "bg-[#9B8577] text-white" : "bg-[#E8DDD4] text-gray-800 hover:bg-[#D4C4B8]"
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => handleTabChange("week")}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === "week" ? "bg-[#9B8577] text-white" : "bg-[#E8DDD4] text-gray-800 hover:bg-[#D4C4B8]"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => handleTabChange("month")}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === "month" ? "bg-[#9B8577] text-white" : "bg-[#E8DDD4] text-gray-800 hover:bg-[#D4C4B8]"
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>

              {/* Dynamic SVG chart with animations */}
              <div className="relative h-64">
                <svg key={animationKey} className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`gradient-${animationKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#9B8577" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#9B8577" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`${chartData[selectedTab]} L 700 200 L 0 200 Z`}
                    fill={`url(#gradient-${animationKey})`}
                    className="chart-fill"
                  />
                  <path 
                    d={chartData[selectedTab]} 
                    fill="none" 
                    stroke="#9B8577" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="chart-line"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
              </div>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-600 text-sm mb-2">Store Items</h3>
                <div className="text-3xl font-bold mb-1 text-gray-900">{stats.storeVisits.value}</div>
                <div className="text-green-600 text-sm font-semibold">+{stats.storeVisits.growth}%</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-600 text-sm mb-2">Conversion Rate</h3>
                <div className="text-3xl font-bold mb-1 text-gray-900">{stats.conversionRate.value}%</div>
                <div className="text-red-600 text-sm font-semibold">{stats.conversionRate.growth}%</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-600 text-sm mb-2">Top Product</h3>
                <div className="text-3xl font-bold mb-1 text-gray-900">{stats.topProduct.name}</div>
                <div className="text-green-600 text-sm font-semibold">+{stats.topProduct.units} units</div>
              </div>
            </div>

            {/* PRODUCT LIST */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>

                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="bg-[#F5F1ED] text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B8577] transition-colors border border-gray-300"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-[#9B8577] mb-4" size={48} />
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : visibleProducts.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No products found in this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="bg-[#F5F1ED] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#9B8577]/20 transition-shadow border border-gray-200">
                      <div className="h-40 bg-white flex items-center justify-center p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 h-12 text-sm text-gray-900">{product.name}</h3>

                        <p className="text-[#9B8577] font-bold mb-2">${product.price}</p>

                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Stock Level</span>
                            <span>{product.stock}/{product.maxStock}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all ${getStockColor(product.stock, product.maxStock)}`} style={{ width: `${getStockPercentage(product.stock, product.maxStock)}%` }} />
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button onClick={() => handleEditProduct(product)} className="flex-1 bg-[#E8DDD4] hover:bg-[#D4C4B8] py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 text-gray-900">
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => handleViewProduct(product)} className="p-2 bg-[#E8DDD4] hover:bg-[#D4C4B8] rounded-lg transition-colors text-gray-900" title="View details">
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* MESSAGES */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Recent Messages</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 hover:bg-[#F5F1ED] p-2 rounded-lg cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#9B8577] flex items-center justify-center flex-shrink-0 text-white">A</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-gray-900">Demo User</span>
                      <span className="text-xs text-gray-500">2m ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">This is a demo message. Connect chat API to show real messages.</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowMessagesModal(true)} className="w-full mt-4 bg-[#E8DDD4] hover:bg-[#D4C4B8] py-3 rounded-lg font-medium transition-colors text-gray-900">View all messages</button>
            </div>

            {/* ORDER FULFILLMENT */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Order Fulfillment</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#9B8577] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{0}</span>
                  </div>
                  <div className="text-xs text-gray-600">New Orders</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#D4C4B8] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{0}</span>
                  </div>
                  <div className="text-xs text-gray-600">Processing</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#E8DDD4] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{0}</span>
                  </div>
                  <div className="text-xs text-gray-600">Shipped</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EDIT PRODUCT MODAL */}
        {showEditModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
                  <input type="text" value={editForm.name} onChange={(e)=>setEditForm({...editForm, name:e.target.value})} className="w-full bg-[#F5F1ED] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9B8577] border border-gray-300"/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Price ($)</label>
                  <input type="number" step="0.01" value={editForm.price} onChange={(e)=>setEditForm({...editForm, price:e.target.value})} className="w-full bg-[#F5F1ED] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9B8577] border border-gray-300"/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Stock</label>
                  <input type="number" value={editForm.stock} onChange={(e)=>setEditForm({...editForm, stock:e.target.value})} max={selectedProduct.maxStock} className="w-full bg-[#F5F1ED] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9B8577] border border-gray-300"/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Condition</label>
                  <select value={editForm.condition} onChange={(e)=>setEditForm({...editForm, condition:e.target.value})} className="w-full bg-[#F5F1ED] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9B8577] border border-gray-300">
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea value={editForm.description} onChange={(e)=>setEditForm({...editForm, description:e.target.value})} rows="3" className="w-full bg-[#F5F1ED] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9B8577] border border-gray-300"/>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => handleDeleteProduct(selectedProduct.id)} className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition-colors text-white">Delete</button>
                <button onClick={handleSaveProduct} className="flex-1 bg-[#9B8577] hover:bg-[#8A7568] py-2 rounded-lg font-medium transition-colors text-white">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW PRODUCT MODAL */}
        {showViewModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                <button onClick={() => setShowViewModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-4">
                <div className="h-64 rounded-xl overflow-hidden bg-white flex items-center justify-center p-6 border border-gray-200">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-contain" onError={(e)=>{e.target.src='https://via.placeholder.com/300?text=No+Image';}}/>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-3xl text-[#9B8577] font-bold mb-4">${selectedProduct.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Stock</p>
                    <p className="font-semibold text-gray-900">{selectedProduct.stock} / {selectedProduct.maxStock}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Condition</p>
                    <p className="font-semibold text-gray-900">{selectedProduct.condition}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Description</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => { setShowViewModal(false); handleEditProduct(selectedProduct); }} className="flex-1 bg-[#9B8577] hover:bg-[#8A7568] py-2 rounded-lg font-medium transition-colors text-white">Edit Product</button>
                  <button onClick={() => handleDeleteProduct(selectedProduct.id)} className="px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ALL MESSAGES MODAL (demo) */}
        {showMessagesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Messages</h2>
                <button onClick={() => setShowMessagesModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors"><X size={24} /></button>
              </div>

              <div className="text-center py-12 text-gray-600">
                <p>No messages available. Connect chat endpoints to display real messages.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}