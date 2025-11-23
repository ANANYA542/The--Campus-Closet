import express from "express";
import {
  getAllItems,
  addToWishlist,
  removeFromWishlist,
  buyItem,
  rentItem,
  getBuyerOrders,
  getBuyerRentals,
  addReview,
  getNotifications
} from "../controllers/buyer.controller.js";

const router = express.Router();

router.get("/items", getAllItems);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:id", removeFromWishlist);
router.post("/buy", buyItem);
router.post("/rent", rentItem);
router.get("/orders/:buyerId", getBuyerOrders);
router.get("/rentals/:renterId", getBuyerRentals);
router.post("/review", addReview);
router.get("/notifications/:userId", getNotifications);

export default router;
