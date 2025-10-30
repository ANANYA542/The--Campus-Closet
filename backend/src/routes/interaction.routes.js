const express = require("express");
const router = express.Router();
const {
  createBuyRequest,
  createRentRequest,
  respondToRequest,
  getPendingRequestsForSeller,
  getRequestsForUser,
} = require("../controllers/interaction.controller");

router.post("/buy", createBuyRequest);
router.post("/rent", createRentRequest);
router.put("/respond/:id", respondToRequest);
router.get("/pending/:sellerId", getPendingRequestsForSeller);
router.get("/myrequests/:userId", getRequestsForUser);

module.exports = router;
