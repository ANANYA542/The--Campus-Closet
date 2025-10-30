const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addToWishlist,
  removeFromWishlist,
  buyItem,
  rentItem,
  getBuyerOrders,
  getBuyerRentals,
  addReview,
  getNotifications,
} = require("../controllers/buyer.controller");

router.get("/items", getAllItems);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:id", removeFromWishlist);
router.post("/buy", buyItem);
router.post("/rent", rentItem);
router.get("/orders/:buyerId", getBuyerOrders);
router.get("/rentals/:renterId", getBuyerRentals);
router.post("/review", addReview);
router.get("/notifications/:userId", getNotifications);

module.exports = router;
