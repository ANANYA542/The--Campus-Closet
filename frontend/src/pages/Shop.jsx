import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAllItems } from "../services/productService";
import { addToCart } from "../services/cartService";
import "./Shop.css";

const Shop = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");
    const [addingToCart, setAddingToCart] = useState({});
    const navigate = useNavigate();
    const { user, loading: authLoading } = useContext(AuthContext);
    const userId = user?.id;

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await getAllItems();
            setItems(data);
            setError(null);
        } catch (err) {
            setError("Failed to load items");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (itemId) => {
        if (!userId) {
            alert("Please login to add items to cart");
            navigate("/login");
            return;
        }

        try {
            setAddingToCart((prev) => ({ ...prev, [itemId]: true }));
            await addToCart(userId, itemId, 1);

            // Show success feedback
            const button = document.querySelector(`[data-item-id="${itemId}"]`);
            if (button) {
                button.textContent = "Added! ✓";
                setTimeout(() => {
                    button.textContent = "Add to Cart";
                }, 2000);
            }
        } catch (err) {
            alert("Failed to add item to cart");
            console.error(err);
        } finally {
            setAddingToCart((prev) => ({ ...prev, [itemId]: false }));
        }
    };

    const categories = ["all", ...new Set(items.map((item) => item.category))];

    const filteredItems =
        filter === "all" ? items : items.filter((item) => item.category === filter);

    if (loading || authLoading) {
        return (
            <div className="shop-container">
                <div className="shop-loading">
                    <div className="spinner"></div>
                    <p>Loading amazing items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-container">
            <div className="shop-header">
                <h1 className="shop-title">Campus Marketplace</h1>
                <p className="shop-subtitle">
                    Discover unique items from students on your campus
                </p>
            </div>

            {error && <div className="shop-error">{error}</div>}

            {/* Category Filter */}
            <div className="shop-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`filter - btn ${filter === category ? "active" : ""} `}
                        onClick={() => setFilter(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
                <div className="shop-empty">
                    <div className="empty-icon">📦</div>
                    <h2>No items found</h2>
                    <p>Check back later for new listings!</p>
                </div>
            ) : (
                <div className="shop-grid">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="product-card">
                            <div className="product-image">
                                {item.images && Array.isArray(item.images) && item.images.length > 0 ? (
                                    <img src={item.images[0]} alt={item.name} />
                                ) : (
                                    <div className="placeholder-image">
                                        <span>📦</span>
                                    </div>
                                )}
                                {item.isForRent && (
                                    <span className="product-badge rent-badge">For Rent</span>
                                )}
                                <span className="product-badge condition-badge">
                                    {item.condition}
                                </span>
                            </div>

                            <div className="product-content">
                                <div className="product-category">{item.category}</div>
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-description">{item.description}</p>

                                <div className="product-footer">
                                    <div className="product-price">
                                        <span className="price-label">Price</span>
                                        <span className="price-value">₹{item.price.toFixed(2)}</span>
                                        {item.isForRent && item.rentPrice && (
                                            <span className="rent-price">
                                                ₹{item.rentPrice}/day
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        className="btn btn--primary add-to-cart-btn"
                                        onClick={() => handleAddToCart(item.id)}
                                        disabled={addingToCart[item.id]}
                                        data-item-id={item.id}
                                    >
                                        {addingToCart[item.id] ? (
                                            <>
                                                <span className="spinner-small"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </button>
                                </div>

                                {item.owner && (
                                    <div className="product-seller">
                                        <span className="seller-label">Seller:</span>
                                        <span className="seller-name">{item.owner.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Cart Button */}
            {userId && (
                <button
                    className="floating-cart-btn"
                    onClick={() => navigate("/cart")}
                    aria-label="View Cart"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="cart-badge">View Cart</span>
                </button>
            )}
        </div>
    );
};

export default Shop;
