const prisma = require("../config/db");
const { createNotification } = require("../services/notification.services");

const createBuyRequest = async (req, res) => {
  try {
    const { buyerId, itemId } = req.body;

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || item.status !== "available") {
      return res.status(400).json({ error: "Item not available" });
    }

    const trx = await prisma.transaction.create({
      data: {
        buyerId,
        sellerId: item.ownerId,
        itemId,
        amount: item.price,
        status: "pending",
      },
      include: { buyer: true, seller: true, item: true },
    });

    await createNotification(
      item.ownerId,
      `Purchase request received for "${item.name}" from user ${buyerId}`,
      "purchase_request"
    );

    res.status(201).json(trx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create buy request" });
  }
};

const createRentRequest = async (req, res) => {
  try {
    const { renterId, itemId, startDate, endDate } = req.body;

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || !item.isForRent || item.status !== "available") {
      return res.status(400).json({ error: "Item not available for rent" });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    const totalDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalRent = (item.rentPrice || 0) * totalDays;
    const deposit = item.price * 0.2;

    const rental = await prisma.rental.create({
      data: {
        renterId,
        itemId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalRent,
        deposit,
        status: "pending",
      },
      include: { renter: true, item: true },
    });

    await createNotification(
      item.ownerId,
      `Rental request received for "${item.name}" from user ${renterId}`,
      "rental_request"
    );

    res.status(201).json(rental);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create rent request" });
  }
};

const respondToRequest = async (req, res) => {
  try {
    const { type } = req.query; // "transaction" or "rental"
    const { action } = req.body; // "accept" or "decline"
    const id = parseInt(req.params.id);

    if (!["transaction", "rental"].includes(type)) {
      return res.status(400).json({ error: "Invalid request type" });
    }
    if (!["accept", "decline"].includes(action)) {
      return res.status(400).json({ error: "Invalid action" });
    }

    if (type === "transaction") {
      const trx = await prisma.transaction.findUnique({ where: { id } });
      if (!trx) return res.status(404).json({ error: "Transaction not found" });
      if (trx.status !== "pending") return res.status(400).json({ error: "Transaction not pending" });

      if (action === "accept") {
        const result = await prisma.$transaction(async (tx) => {
          const updatedTrx = await tx.transaction.update({
            where: { id },
            data: { status: "completed" },
            include: { buyer: true, seller: true, item: true },
          });

          await tx.item.update({
            where: { id: updatedTrx.itemId },
            data: { status: "sold" },
          });

          await tx.notification.createMany({
            data: [
              {
                userId: updatedTrx.buyerId,
                message: `Your purchase for "${updatedTrx.item.name}" was accepted.`,
                type: "purchase_accepted",
              },
              {
                userId: updatedTrx.sellerId,
                message: `You confirmed sale of "${updatedTrx.item.name}".`,
                type: "sale_confirmed",
              },
            ],
          });

          return updatedTrx;
        });

        return res.json(result);
      } else {
        const updatedTrx = await prisma.transaction.update({
          where: { id },
          data: { status: "cancelled" },
        });

        await createNotification(
          trx.buyerId,
          `Your purchase request for item ${trx.itemId} was declined.`,
          "purchase_declined"
        );

        return res.json(updatedTrx);
      }
    } else {
      const rental = await prisma.rental.findUnique({ where: { id } });
      if (!rental) return res.status(404).json({ error: "Rental not found" });
      if (rental.status !== "pending") return res.status(400).json({ error: "Rental not pending" });

      if (action === "accept") {
        const result = await prisma.$transaction(async (tx) => {
          const updatedRental = await tx.rental.update({
            where: { id },
            data: { status: "active" },
            include: { renter: true, item: true },
          });

          await tx.item.update({
            where: { id: updatedRental.itemId },
            data: { status: "rented" },
          });

          await tx.notification.createMany({
            data: [
              {
                userId: updatedRental.renterId,
                message: `Your rental for "${updatedRental.item.name}" was approved.`,
                type: "rental_approved",
              },
              {
                userId: updatedRental.item.ownerId,
                message: `You approved rental for "${updatedRental.item.name}".`,
                type: "rental_confirmed",
              },
            ],
          });

          return updatedRental;
        });

        return res.json(result);
      } else {
        const updatedRental = await prisma.rental.update({
          where: { id },
          data: { status: "cancelled" },
        });

        await createNotification(
          rental.renterId,
          `Your rental request for item ${rental.itemId} was declined.`,
          "rental_declined"
        );

        return res.json(updatedRental);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to respond to request" });
  }
};

const getPendingRequestsForSeller = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.sellerId);

    const pendingTransactions = await prisma.transaction.findMany({
      where: { sellerId, status: "pending" },
      include: { buyer: true, item: true },
      orderBy: { createdAt: "desc" },
    });

    const pendingRentals = await prisma.rental.findMany({
      where: { item: { ownerId: sellerId }, status: "pending" },
      include: { renter: true, item: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ transactions: pendingTransactions, rentals: pendingRentals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pending requests" });
  }
};

const getRequestsForUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const myTransactions = await prisma.transaction.findMany({
      where: { buyerId: userId },
      include: { item: true, seller: true },
      orderBy: { createdAt: "desc" },
    });

    const myRentals = await prisma.rental.findMany({
      where: { renterId: userId },
      include: { item: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ transactions: myTransactions, rentals: myRentals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user requests" });
  }
};

module.exports = {
  createBuyRequest,
  createRentRequest,
  respondToRequest,
  getPendingRequestsForSeller,
  getRequestsForUser,
};
