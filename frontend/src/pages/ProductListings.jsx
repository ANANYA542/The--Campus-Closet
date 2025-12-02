import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "New Listings" },
    { id: "Textbooks", label: "Textbooks" },
    { id: "Apparel", label: "Apparel" },
    { id: "Electronics", label: "Electronics" },
    { id: "Dorm & Living", label: "Dorm & Living" },
    { id: "Stationery", label: "Stationery" },
  ];

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5050/api/buyer/items");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      try {
        const fallback = await axios.get(
          "http://localhost:5050/api/products/new-arrivals"
        );
        setProducts(fallback.data);
        setFilteredProducts(fallback.data);
      } catch (err2) {
        console.error("Fallback failed:", err2);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = async (filterId) => {
    setActiveFilter(filterId);
    setSearchQuery("");
    setLoading(true);

    try {
      if (filterId === "all") {
        // Fetch new arrivals
        const response = await axios.get(
          "http://localhost:5050/api/products/new-arrivals"
        );
        setFilteredProducts(response.data);
      } else {
        // Fetch by category
        const response = await axios.get(
          `http://localhost:5050/api/products/category/${filterId}`
        );
        setFilteredProducts(response.data);
      }
    } catch (error) {
      console.error("Error filtering products:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5050/api/products/search?q=${query}`
      );
      setFilteredProducts(response.data);
      setActiveFilter("");
    } catch (error) {
      console.error("Error searching products:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a1423]">
      {/* Hero Section */}
      <div className="relative py-24 px-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop"
            alt="hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#0a1423]/60 to-[#0a1423]"></div>
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-3">
            College New Listings
          </h1>
          <p className="text-gray-300 text-base mb-10">
            Find the best deals from your peers on campus.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for textbooks, dorm decor, apparel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-[#12233a] text-white rounded-xl border border-[#1f2d44] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-[#0b1a2d] sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all font-medium text-sm ${
                  activeFilter === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-[#12233a] text-gray-300 hover:bg-[#1b2d48] border border-[#1f2d44]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-400 mt-4">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="dark" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
