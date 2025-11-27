import React, { useState, useEffect } from 'react';
import { Eye, ShoppingCart, Package, TrendingUp, MessageSquare, Edit, X, Plus, Trash2, Loader2 } from 'lucide-react';

export default function SellerDashboard() {
  const [selectedTab, setSelectedTab] = useState('week');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("men's clothing");
  const [editForm, setEditForm] = useState({});

  // Available categories from Fake Store API
  const categories = [
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelry" }
  ];

  // SALES DATA
  const getSalesData = (period) => {
    const data = {
      day: { total: 685.30, growth: 8.2 },
      week: { total: 4820.50, growth: 12.5 },
      month: { total: 18945.75, growth: 15.8 }
    };
    return data[period];
  };

  const [salesData, setSalesData] = useState(getSalesData('week'));

  const stats = {
    storeVisits: { value: 1204, growth: 5.1 },
    conversionRate: { value: 4.2, growth: -0.2 },
    topProduct: { name: 'Cyber Tee', units: 8 }
  };

  // MESSAGES
  const [messages, setMessages] = useState([
    { id: 1, name: 'Jordan P.', message: 'Hey, can you ship this to Germany?', time: '2m ago', fullMessage: 'Hey, can you ship this to Germany? I need it for my semester abroad. Let me know the shipping cost!' },
    { id: 2, name: 'Alex D.', message: 'My order #1243 hasn\'t arrived yet.', time: '1hr ago', fullMessage: 'My order #1243 hasn\'t arrived yet. Can you check the tracking? I ordered it 5 days ago.' }
  ]);

  const orderFulfillment = {
    newOrders: 12,
    processing: 8,
    shipped: 21
  };

  // PRODUCTS FROM API
  const [products, setProducts] = useState([]);

  // Fetch products from API
  const fetchProducts = (category) => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => res.json())
      .then(data => {
        const mappedProducts = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          stock: Math.floor(Math.random() * 50 + 1),
          maxStock: 100,
          description: item.description,
          image: item.image,
          color: "bg-gray-700",
          condition: "New",
          category: item.category
        }));

        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // STOCK HELPERS
  const getStockColor = (stock, maxStock) => {
    const percentage = (stock / maxStock) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStockPercentage = (stock, maxStock) => {
    return (stock / maxStock) * 100;
  };

  // HANDLERS
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSalesData(getSalesData(tab));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      condition: product.condition,
      description: product.description
    });
    setShowEditModal(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleSaveProduct = () => {
    const updatedProduct = {
      ...selectedProduct,
      ...editForm,
      price: parseFloat(editForm.price),
      stock: parseInt(editForm.stock)
    };
    
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      setShowEditModal(false);
      setShowViewModal(false);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessagesModal(true);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setShowMessagesModal(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Let's make some sales, Alex!</h1>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* SALES PERFORMANCE */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Sales Performance</h2>
                  <div className="text-5xl font-bold mb-1 text-gray-900">${salesData.total.toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      {selectedTab === 'day' ? 'Today' : selectedTab === 'week' ? 'This Week' : 'This Month'}
                    </span>
                    <span className="text-green-600 font-semibold">+{salesData.growth}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleTabChange('day')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === 'day' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => handleTabChange('week')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === 'week' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => handleTabChange('month')}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedTab === 'month' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>

              {/* CHART */}
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 120 Q 50 80, 100 100 T 200 80 T 300 120 T 400 60 T 500 100 T 600 80 T 700 100"
                    fill="url(#gradient)"
                  />
                  <path
                    d="M 0 120 Q 50 80, 100 100 T 200 80 T 300 120 T 400 60 T 500 100 T 600 80 T 700 100"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
              </div>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-gray-600 text-sm mb-2">Store Visits</h3>
                <div className="text-3xl font-bold mb-1 text-gray-900">{stats.storeVisits.value.toLocaleString()}</div>
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
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors border border-gray-300"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No products found in this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-shadow border border-gray-200">

                      {/* PRODUCT IMAGE */}
                      <div className="h-40 bg-white flex items-center justify-center p-4">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                          }}
                        />
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 h-12 text-sm text-gray-900">
                          {product.name}
                        </h3>

                        <p className="text-pink-600 font-bold mb-2">${product.price}</p>

                        <div className="mb-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Stock Level</span>
                            <span>{product.stock}/{product.maxStock}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${getStockColor(product.stock, product.maxStock)}`}
                              style={{ width: `${getStockPercentage(product.stock, product.maxStock)}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 text-gray-900"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleViewProduct(product)}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors text-gray-900"
                            title="View details"
                          >
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
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    onClick={() => handleViewMessage(msg)}
                    className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm text-gray-900">{msg.name}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowMessagesModal(true)}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors text-gray-900"
              >
                View all messages
              </button>
            </div>

            {/* ORDER FULFILLMENT */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">Order Fulfillment</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-cyan-500 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{orderFulfillment.newOrders}</span>
                  </div>
                  <div className="text-xs text-gray-600">New Orders</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-pink-500 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{orderFulfillment.processing}</span>
                  </div>
                  <div className="text-xs text-gray-600">Processing</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl font-bold text-gray-900">{orderFulfillment.shipped}</span>
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
                <button onClick={() => setShowEditModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                    max={selectedProduct.maxStock}
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Condition</label>
                  <select
                    value={editForm.condition}
                    onChange={(e) => setEditForm({...editForm, condition: e.target.value})}
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300"
                  >
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition-colors text-white"
                >
                  Delete
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 py-2 rounded-lg font-medium transition-colors text-white"
                >
                  Save Changes
                </button>
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
                <button onClick={() => setShowViewModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">

                {/* PRODUCT IMAGE */}
                <div className="h-64 rounded-xl overflow-hidden bg-white flex items-center justify-center p-6 border border-gray-200">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-3xl text-pink-600 font-bold mb-4">${selectedProduct.price}</p>
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
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditProduct(selectedProduct);
                    }}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 py-2 rounded-lg font-medium transition-colors text-white"
                  >
                    Edit Product
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                    className="px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ALL MESSAGES MODAL */}
        {showMessagesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Messages</h2>
                <button onClick={() => setShowMessagesModal(false)} className="text-gray-600 hover:text-gray-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 text-xl text-white">
                          {msg.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-900">{msg.name}</span>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                          <p className="text-gray-700">{msg.fullMessage}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm transition-colors text-white">
                          Reply
                        </button>
                        <button 
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition-colors text-gray-900"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}