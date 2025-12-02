import api from "./api";

/**
 * Product Service - Handles all product-related API calls
 */

// Get all available items
export const getAllItems = async () => {
    try {
        const response = await api.get("/buyer/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

// Get single item by ID
export const getItemById = async (itemId) => {
    try {
        const response = await api.get(`/buyer/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
};
