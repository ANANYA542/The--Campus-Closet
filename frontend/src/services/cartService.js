import api from "./api";

/**
 * Cart Service - Handles all cart-related API calls
 */

// Get cart items for a user
export const getCart = async (userId) => {
    try {
        const response = await api.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};

// Add item to cart
export const addToCart = async (userId, itemId, quantity = 1) => {
    try {
        const response = await api.post("/cart", {
            userId,
            itemId,
            quantity,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
    try {
        const response = await api.delete(`/cart/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};

// Checkout cart
export const checkoutCart = async (userId) => {
    try {
        const response = await api.post("/cart/checkout", {
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error during checkout:", error);
        throw error;
    }
};
