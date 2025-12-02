import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// Place Order
router.post("/place", async (req, res) => {
  try {
    const { buyerId, itemId, paymentMethod, deliveryDetails, upiId, amount } = req.body;

    const order = await prisma.order.create({
      data: {
        buyerId: parseInt(buyerId),
        sellerId: 0, // Will be updated when we fetch item owner
        itemId: parseInt(itemId),
        amount: parseFloat(amount),
        paymentMethod,
        deliveryDetails,
        upiId,
        status: "pending",
        razorpayOrderId: `dummy_${Date.now()}`, // Dummy ID for schema compatibility
        paymentStatus: "pending",
      },
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get Buyer Orders
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    const buyerId = parseInt(req.params.buyerId);

    const orders = await prisma.order.findMany({
      where: { buyerId },
      include: {
        item: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get Order by ID
router.get("/:orderId", async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        item: true,
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
