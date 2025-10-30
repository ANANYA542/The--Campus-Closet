const express = require("express");
const router = express.Router();

const {
  addItem,
  getSellerItems,
  updateItem,
  deleteItem,
  getSellerStats,
  getSellerTransactions,
  getSellerRentals,
  approveRental,
  endRental,
} = require("../controllers/seller.controller");

router.post("/item", addItem);
router.get("/items/:sellerId", getSellerItems);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);
router.get("/stats/:sellerId", getSellerStats);
router.get("/transactions/:sellerId", getSellerTransactions);
router.get("/rentals/:sellerId", getSellerRentals);
router.patch("/rental/approve/:rentalId", approveRental);
router.patch("/rental/end/:rentalId", endRental);

module.exports = router;
