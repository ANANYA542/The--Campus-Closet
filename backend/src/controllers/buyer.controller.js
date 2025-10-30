const prisma = require("../config/db");

const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { status: "available" },
      include: { owner: true, reviews: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const existing = await prisma.wishlist.findFirst({
      where: { userId, itemId },
    });
    if (existing) {
      return res.status(400).json({ error: "Item already in wishlist" });
    }
    const wishlist = await prisma.wishlist.create({
      data: { userId, itemId },
    });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.wishlist.delete({ where: { id } });
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

const buyItem = async (req, res) => {
  try {
    const { buyerId, itemId } = req.body;
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || item.status !== "available") {
      return res.status(400).json({ error: "Item not available" });
    }
    const transaction = await prisma.transaction.create({
      data: {
        buyerId,
        sellerId: item.ownerId,
        itemId,
        amount: item.price,
        status: "completed",
      },
    });
    await prisma.item.update({
      where: { id: itemId },
      data: { status: "sold" },
    });
    await prisma.notification.create({
      data: {
        userId: item.ownerId,
        message: `Your item "${item.name}" has been purchased.`,
        type: "sale",
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to buy item" });
  }
};

const rentItem = async (req, res) => {
  try {
    const { renterId, itemId, startDate, endDate } = req.body;
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || !item.isForRent || item.status !== "available") {
      return res.status(400).json({ error: "Item not available for rent" });
    }
    const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalRent = totalDays * (item.rentPrice || 0);
    const rental = await prisma.rental.create({
      data: {
        renterId,
        itemId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalRent,
        deposit: item.price * 0.2,
        status: "pending",
      },
    });
    await prisma.notification.create({
      data: {
        userId: item.ownerId,
        message: `New rental request for "${item.name}".`,
        type: "rental_request",
      },
    });
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: "Failed to rent item" });
  }
};

const getBuyerOrders = async (req, res) => {
  try {
    const buyerId = parseInt(req.params.buyerId);
    const orders = await prisma.transaction.findMany({
      where: { buyerId },
      include: { item: true, seller: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getBuyerRentals = async (req, res) => {
  try {
    const renterId = parseInt(req.params.renterId);
    const rentals = await prisma.rental.findMany({
      where: { renterId },
      include: { item: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rentals" });
  }
};

const addReview = async (req, res) => {
  try {
    const { userId, itemId, rating, comment } = req.body;
    const review = await prisma.review.create({
      data: { userId, itemId, rating, comment },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

module.exports = {
  getAllItems,
  addToWishlist,
  removeFromWishlist,
  buyItem,
  rentItem,
  getBuyerOrders,
  getBuyerRentals,
  addReview,
  getNotifications,
};
