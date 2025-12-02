import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronRight, User } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config/api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlistAdded, setWishlistAdded] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchSimilarProducts();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/products/${id}/similar`
      );
      setSimilarProducts(response.data);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      // Get userId from localStorage or context - using dummy ID for now
      const userId = 1;
      await axios.post(`${API_BASE_URL}/api/cart`, {
        userId,
        itemId: product.id,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  const handleToggleWishlist = async () => {
    try {
      const userId = 1;
      await axios.post(`${API_BASE_URL}/api/buyer/wishlist`, {
        userId,
        itemId: product.id,
      });
      setWishlistAdded(true);
      alert("Added to wishlist");
    } catch (error) {
      alert(error?.response?.data?.error || "Unable to update wishlist");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-400"
          }
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Product not found</p>
      </div>
    );
  }

  const images = product.images
    ? typeof product.images === "string"
      ? JSON.parse(product.images)
      : product.images
    : ["https://via.placeholder.com/600x600?text=No+Image"];

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-white font-sans overflow-y-auto">
      {/* Breadcrumb */}
      <div className="bg-[#121213] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              to="/products"
              className="hover:text-purple-400 transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-300">{product.category}</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium truncate max-w-xs">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Images (7 cols) */}
          <div className="lg:col-span-7">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden mb-6 aspect-[4/3] shadow-xl relative group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all bg-white ${
                      selectedImage === index
                        ? "border-blue-500 shadow-lg scale-105"
                        : "border-transparent hover:border-blue-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {product.name}
              </h1>

              {product.owner && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px]">
                    <img
                      src={
                        product.owner.avatarUrl ||
                        "https://via.placeholder.com/40"
                      }
                      alt={product.owner.name}
                      className="w-full h-full rounded-full border-2 border-[#0a1628]"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sold by</p>
                    <p className="font-semibold text-purple-400 hover:text-purple-300 cursor-pointer">
                      @{product.owner.name.replace(" ", "")}
                    </p>
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 bg-[#1d1d22] p-4 rounded-xl border border-white/10 w-fit">
                <div className="flex gap-1">
                  {renderStars(product.averageRating || 0)}
                </div>
                <div className="h-4 w-px bg-white/20"></div>
                <span className="text-purple-300 font-medium">
                  {product.reviewCount || 0} Reviews
                </span>
                {product.condition && (
                  <>
                    <div className="h-4 w-px bg-white/20"></div>
                    <span
                      className={`px-3 py-0.5 rounded-full text-sm font-medium bg-purple-600/20 text-purple-300`}
                    >
                      {product.condition}
                    </span>
                  </>
                )}
              </div>

              {/* Price Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-[#1d1d22] rounded-2xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Buy Now</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 mb-1">INR</span>
                  </div>
                </div>
                {product.isForRent && product.rentPrice && (
                  <div className="p-6 bg-[#1d1d22] rounded-2xl border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Or Rent</p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-purple-300">
                        ₹{product.rentPrice}
                      </span>
                      <span className="text-sm text-gray-500 mb-1">/month</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 hover:-translate-y-0.5"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-purple-300 font-semibold py-4 px-6 rounded-xl border-2 border-purple-500/30 hover:border-purple-400 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="bg-[#1d1d22] hover:bg-[#242429] text-white p-4 rounded-xl border border-white/10 transition-all hover:border-purple-400/50"
                >
                  <Heart
                    size={24}
                    className={`${
                      wishlistAdded ? "fill-pink-500 text-pink-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          <div className="border-b border-white/10 mb-8">
            <div className="flex gap-12">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-bold capitalize text-lg transition-all relative ${
                    activeTab === tab
                      ? "text-purple-400"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 rounded-t-full shadow-[0_-2px_10px_rgba(168,85,247,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="text-gray-300 min-h-[200px]">
            {activeTab === "description" && (
              <div className="max-w-4xl animate-fadeIn">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Product Description
                </h3>
                <p className="leading-loose text-lg text-gray-300">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Technical Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  {[
                    { label: "Category", value: product.category },
                    { label: "Condition", value: product.condition },
                    {
                      label: "Status",
                      value: product.status,
                      capitalize: true,
                    },
                    {
                      label: "Rentable",
                      value: product.isForRent ? "Yes" : "No",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-4 bg-[#1e3a5f]/20 rounded-xl border border-white/5"
                    >
                      <span className="text-gray-400">{item.label}</span>
                      <span
                        className={`font-semibold text-white ${
                          item.capitalize ? "capitalize" : ""
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    Customer Reviews ({product.reviews?.length || 0})
                  </h3>
                  <button className="text-blue-400 hover:text-blue-300 font-medium">
                    Write a Review
                  </button>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-[#1e3a5f]/20 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            {review.user?.avatarUrl ? (
                              <img
                                src={review.user.avatarUrl}
                                alt={review.user.name}
                                className="w-12 h-12 rounded-full border border-white/10"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <User size={20} className="text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-white">
                                {review.user?.name || "Anonymous"}
                              </p>
                              <div className="flex mt-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 bg-black/20 px-3 py-1 rounded-full">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed italic">
                          "{review.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#1e3a5f]/10 rounded-2xl border border-white/5 border-dashed">
                    <p className="text-gray-400 text-lg">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                You Might Also Like
              </h2>
              <Link
                to="/products"
                className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="overflow-x-auto -mx-2 px-2">
              <div className="flex gap-6 pb-2">
                {similarProducts.map((product) => (
                  <div key={product.id} className="w-56 flex-shrink-0">
                    <ProductCard product={product} variant="dark" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
