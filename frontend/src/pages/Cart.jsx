import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    getCart,
    removeFromCart,
    checkoutCart,
} from "../services/cartService";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await getCart(userId);
            setCartItems(data);
            setError(null);
        } catch (err) {
            setError("Failed to load cart items");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await removeFromCart(cartItemId);
            // Remove item from local state
            setCartItems(cartItems.filter((item) => item.id !== cartItemId));
        } catch (err) {
            alert("Failed to remove item from cart");
            console.error(err);
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            setCheckoutLoading(true);
            const result = await checkoutCart(userId);
            alert(
                `Checkout successful! ${result.transactions.length} item(s) purchased.`
            );
            setCartItems([]);
            // Optionally navigate to orders page
            // navigate('/orders');
        } catch (err) {
            alert("Checkout failed. Please try again.");
            console.error(err);
        } finally {
            setCheckoutLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.item.price * cartItem.quantity;
        }, 0);
    };

    if (loading) {
        return (
            <div className="cart-container">
                <div className="cart-loading">
                    <div className="spinner"></div>
                    <p>Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
                    cart
                </p>
            </div>

            {error && <div className="cart-error">{error}</div>}

            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <div className="empty-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some items to get started!</p>
                    <button className="btn btn--primary" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((cartItem) => (
                            <div key={cartItem.id} className="cart-item">
                                <div className="cart-item-image">
                                    {cartItem.item.images &&
                                        Array.isArray(cartItem.item.images) &&
                                        cartItem.item.images.length > 0 ? (
                                        <img
                                            src={cartItem.item.images[0]}
                                            alt={cartItem.item.name}
                                        />
                                    ) : (
                                        <div className="placeholder-image">
                                            <span>📦</span>
                                        </div>
                                    )}
                                </div>

                                <div className="cart-item-details">
                                    <h3 className="item-name">{cartItem.item.name}</h3>
                                    <p className="item-description">
                                        {cartItem.item.description}
                                    </p>
                                    <div className="item-meta">
                                        <span className="item-category">
                                            {cartItem.item.category}
                                        </span>
                                        <span className="item-condition">
                                            {cartItem.item.condition}
                                        </span>
                                    </div>
                                </div>

                                <div className="cart-item-quantity">
                                    <label>Qty</label>
                                    <div className="quantity-display">{cartItem.quantity}</div>
                                </div>

                                <div className="cart-item-price">
                                    <div className="price-label">Price</div>
                                    <div className="price-value">
                                        ₹{cartItem.item.price.toFixed(2)}
                                    </div>
                                    {cartItem.quantity > 1 && (
                                        <div className="price-subtotal">
                                            Subtotal: ₹
                                            {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="cart-item-remove"
                                    onClick={() => handleRemoveItem(cartItem.id)}
                                    aria-label="Remove item"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 5L5 15M5 5L15 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-card">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{calculateTotal().toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free-shipping">FREE</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span className="total-amount">
                                    ₹{calculateTotal().toFixed(2)}
                                </span>
                            </div>

                            <button
                                className="btn btn--primary btn--lg checkout-btn"
                                onClick={handleCheckout}
                                disabled={checkoutLoading}
                            >
                                {checkoutLoading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Proceed to Checkout"
                                )}
                            </button>

                            <button
                                className="btn btn--ghost btn--lg"
                                onClick={() => navigate("/")}
                            >
                                Continue Shopping
                            </button>

                            <div className="security-badge">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 1L3 3V7C3 10.5 5.5 13.5 8 14.5C10.5 13.5 13 10.5 13 7V3L8 1Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6 8L7.5 9.5L10.5 6.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
