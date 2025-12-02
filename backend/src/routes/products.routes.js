import express from "express";
import {
  getNewArrivals,
  getProductDetail,
  getSimilarProducts,
  searchProducts,
  getProductsByCategory,
  getUserWishlist,
} from "../controllers/products.controller.js";

const router = express.Router();

// GET /api/products/new-arrivals - Get products from past 7 days
router.get("/new-arrivals", getNewArrivals);

// GET /api/products/search?q=searchTerm - Search products
router.get("/search", searchProducts);

// GET /api/products/category/:category - Get products by category
router.get("/category/:category", getProductsByCategory);

// GET /api/products/wishlist/:userId - Get user wishlist
router.get("/wishlist/:userId", getUserWishlist);

// GET /api/products/:id/similar - Get similar products
router.get("/:id/similar", getSimilarProducts);

// GET /api/products/:id - Get product detail
router.get("/:id", getProductDetail);

export default router;
