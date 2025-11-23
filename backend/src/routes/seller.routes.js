import express from "express";
import {
  addItem,
  getSellerItems,
  updateItem,
  deleteItem,
  getSellerStats,
  getSellerTransactions,
  getSellerRentals,
  approveRental,
  endRental
} from "../controllers/seller.controller.js";

const router = express.Router();

router.post("/item", addItem);
router.get("/items/:sellerId", getSellerItems);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);
router.get("/stats/:sellerId", getSellerStats);
router.get("/transactions/:sellerId", getSellerTransactions);
router.get("/rentals/:sellerId", getSellerRentals);
router.patch("/rental/approve/:rentalId", approveRental);
router.patch("/rental/end/:rentalId", endRental);

export default router;
