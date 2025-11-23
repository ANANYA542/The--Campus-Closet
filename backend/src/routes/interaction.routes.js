import express from "express";
import {
  createBuyRequest,
  createRentRequest,
  respondToRequest,
  getPendingRequestsForSeller,
  getRequestsForUser
} from "../controllers/interaction.controller.js";

const router = express.Router();

router.post("/buy", createBuyRequest);
router.post("/rent", createRentRequest);
router.put("/respond/:id", respondToRequest);
router.get("/pending/:sellerId", getPendingRequestsForSeller);
router.get("/myrequests/:userId", getRequestsForUser);

export default router;
