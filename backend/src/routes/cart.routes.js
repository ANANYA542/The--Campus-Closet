import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
    checkoutCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);               // Add or increment item in cart
router.delete("/:id", removeFromCart);    // Remove cart entry
router.get("/:userId", getCart);          // Get cart for a user
router.post("/checkout", checkoutCart);   // Checkout cart

export default router;