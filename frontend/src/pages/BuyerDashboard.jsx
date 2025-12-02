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
// ⭐ Import your pink cloud background image
import PinkCloudBG from "../assets/pink-cloud-bg.png";
// Banner images
import stationaryBanner from "../assets/stationarybanner.png";
import furnitureBanner from "../assets/furniturebanner.png";
import foodBanner from "../assets/foodbanner.png";
import clothesBanner from "../assets/clothesbanner.png";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Mock user (replace with real auth data)
  const user = {
    id: 1,
    name: "Ananya",
    role: "Student Buyer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
  };

  useEffect(() => {
    fetchDashboardData();
    fetchAllProducts();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

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

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/buyer/items");
      setAllProducts(res.data || []);
    } catch {
      try {
        const fallback = await axios.get(
          "http://localhost:5050/api/products/new-arrivals"
        );
        setAllProducts(fallback.data || []);
      } catch (err2) {
        console.error("Failed to load products", err2);
      }
    }
  };

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((p) => (p + 1) % 4), 5000);
    return () => clearInterval(id);
  }, []);

  const slides = [
    { img: stationaryBanner, cta: "Explore Collection", slug: "stationary" },
    { img: furnitureBanner, cta: "Browse Collection", slug: "furniture" },
    { img: foodBanner, cta: "See What’s Cooking", slug: "food" },
    { img: clothesBanner, cta: "Shop Now", slug: "clothes" },
  ];

  const goToCategory = (slug) => navigate(`/category/${slug}`);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Purchased", icon: Package },
    { id: "wishlist", label: "Saved", icon: Heart },
    { id: "recommendations", label: "Recommended", icon: Sparkles },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex font-sans"
      style={{
        backgroundImage: `url(${PinkCloudBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* SIDEBAR (hidden for top navbar design) */}
      <div className="hidden">
        {/* User Profile */}
        <div className="p-8 border-b border-white/30">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-14 h-14 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <p className="font-semibold text-lg text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                  active
                    ? "bg-white shadow-md text-gray-900"
                    : "text-gray-700 hover:bg-white/60"
                }`}
              >
                <Icon
                  size={22}
                  className={active ? "text-gray-900" : "text-gray-600"}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 text-gray-700 hover:bg-white/60 rounded-xl"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {/* Buyer Top Navbar */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "orders", label: "Purchased" },
                { id: "rented", label: "Rented" },
                { id: "wishlist", label: "Saved" },
                { id: "settings", label: "Settings" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    setActiveSection(link.id === "rented" ? "orders" : link.id)
                  }
                  className={`px-2 py-1 ${
                    activeSection ===
                    (link.id === "rented" ? "orders" : link.id)
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
            <div className="relative w-full h-[360px] md:h-[440px]">
              {slides.map((s, i) => (
                <img
                  key={i}
                  src={s.img}
                  alt={s.slug}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeSlide === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {slides[activeSlide] && (
                <div className="absolute right-8 bottom-10">
                  <button
                    onClick={() => goToCategory(slides[activeSlide].slug)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-gray-900/40 text-gray-900 rounded-full hover:bg-white/60 hover:shadow transition"
                  >
                    {slides[activeSlide].cta}
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      activeSlide === i ? "bg-gray-900" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Shop by Categories */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shop by Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Stationary",
                      slug: "stationary",
                      img: stationaryBanner,
                    },
                    {
                      label: "Furniture",
                      slug: "furniture",
                      img: furnitureBanner,
                    },
                    { label: "Food", slug: "food", img: foodBanner },
                    { label: "Clothes", slug: "clothes", img: clothesBanner },
                  ].map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => navigate(`/category/${c.slug}`)}
                      className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow transition"
                    >
                      <img
                        src={c.img}
                        alt={c.label}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 text-left">
                        <span className="text-sm font-medium text-gray-900">
                          {c.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* All Products */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Products
                  </h2>
                </div>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {allProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        className="bg-white border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-10 max-w-7xl mx-auto">
          {/* DASHBOARD SECTION */}
          {activeSection === "dashboard" && (
            <div className="space-y-10">
              {/* Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold mb-1 text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Welcome back, {user.name}!
                  </p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="px-5 py-2.5 bg-white/80 backdrop-blur-lg border border-gray-300 rounded-xl shadow hover:shadow-md flex items-center gap-2 transition"
                >
                  <ShoppingBag size={20} />
                  Browse Listings
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { label: "Purchased", value: "12 Items", icon: Package },
                  { label: "Rented", value: "3 Items", icon: ShoppingBag },
                  { label: "Saved", value: "8 Items", icon: Heart },
                  { label: "Rentals Due", value: "1 Item", icon: Sparkles },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/75 backdrop-blur-lg border border-gray-200 p-5 rounded-xl shadow flex items-center gap-4"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon size={18} className="text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {s.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Saved Listings */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Saved Listings
                </h2>

                {loading ? (
                  <LoadingSpinner />
                ) : wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.slice(0, 2).map((item) => (
                      <ProductCard
                        key={item.item.id}
                        product={item.item}
                        className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow hover:shadow-xl transition"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No saved items</p>
                )}
              </div>

              {/* Recommended */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Recommended For You
                </h2>

                <div className="space-y-4 max-w-xs">
                  {[
                    {
                      name: "Mini Fridge for Dorm",
                      price: 6800,
                      image:
                        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
                    },
                    {
                      name: "Set of 5 Notebooks",
                      price: 950,
                      image:
                        "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e",
                    },
                    {
                      name: "Portable Power Bank",
                      price: 2400,
                      image:
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-lg border border-gray-200 p-4 rounded-xl shadow flex items-center gap-4 hover:shadow-md transition"
                    >
                      <img
                        src={item.image}
                        className="w-20 h-20 rounded-xl object-cover"
                        alt=""
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-700">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FUTURE SECTIONS (Keep or let me redesign them similarly) */}
          {activeSection === "orders" && (
            <h1 className="text-3xl text-gray-900">Orders Page Coming</h1>
          )}

          {activeSection === "wishlist" && (
            <h1 className="text-3xl text-gray-900">Wishlist Page Coming</h1>
          )}

          {activeSection === "recommendations" && (
            <h1 className="text-3xl text-gray-900">
              Recommendations Coming Soon
            </h1>
          )}

          {activeSection === "settings" && (
            <h1 className="text-3xl text-gray-900">Settings Coming Soon</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
