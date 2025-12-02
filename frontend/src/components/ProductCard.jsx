import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const ProductCard = ({ product, className = "", variant = "light" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Get first image from images array or use placeholder
  const getProductImage = () => {
    if (product.images) {
      try {
        const imagesArray = typeof product.images === "string" 
          ? JSON.parse(product.images) 
          : product.images;
        return imagesArray[0] || "https://via.placeholder.com/300x300?text=No+Image";
      } catch {
        return "https://via.placeholder.com/300x300?text=No+Image";
      }
    }
    return "https://via.placeholder.com/300x300?text=No+Image";
  };

  // Render star rating
  const renderRating = () => {
    const rating = product.averageRating || 0;
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
        />
      );
    }

    return stars;
  };

  const isDark = variant === "dark";

  return (
    <div
      onClick={handleClick}
      className={`product-card ${isDark ? "bg-[#101a2a] border-[#1e2a3a]" : "bg-white border-gray-100"} rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-2xl border ${className}`}
    >
      <div className={`aspect-square overflow-hidden ${isDark ? "bg-[#0f1725]" : "bg-gray-50"}`}>
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <h3 className={`${isDark ? "text-white" : "text-gray-900"} font-medium text-base mb-1.5 line-clamp-2 leading-snug`}>
          {product.name}
        </h3>
        
        {product.owner && (
          <p className={`${isDark ? "text-gray-300" : "text-gray-500"} text-xs mb-2.5`}>
            Seller: {product.owner.name}
          </p>
        )}
        
        <div className="flex items-center gap-1 mb-3">
          {renderRating()}
          {product.reviewCount > 0 && (
            <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs ml-1`}>
              ({product.reviewCount})
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className={`${isDark ? "text-blue-300" : "text-blue-700"} font-bold text-lg`}>
              ₹{product.price.toLocaleString()}
            </p>
            {product.isForRent && product.rentPrice && (
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs mt-0.5`}>
                or ₹{product.rentPrice}/month
              </p>
            )}
          </div>
          
          {product.condition && (
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              product.condition === "New" 
                ? `${isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"}`
                : product.condition === "Excellent"
                ? `${isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"}`
                : `${isDark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-100 text-yellow-700"}`
            }`}>
              {product.condition}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
