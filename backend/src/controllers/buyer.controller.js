import prisma from "../config/db.js";

// ---------------- GET ALL ITEMS ----------------
export const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { status: "available" },
      include: { owner: true, reviews: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    console.error("Error in getAllItems:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

// ---------------- ADD TO WISHLIST ----------------
export const addToWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const exists = await prisma.wishlist.findFirst({
      where: { userId, itemId },
    });

    if (exists) {
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

// ---------------- REMOVE WISHLIST ----------------
export const removeFromWishlist = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.wishlist.delete({ where: { id } });
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove" });
  }
};

// ---------------- BUY ITEM ----------------
export const buyItem = async (req, res) => {
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
        status: "completed",
      },
    });

    await prisma.item.update({
      where: { id: itemId },
      data: { status: "sold" },
    });

    res.status(201).json(trx);
  } catch (error) {
    res.status(500).json({ error: "Failed to buy item" });
  }
};

// ---------------- RENT ITEM ----------------
export const rentItem = async (req, res) => {
  try {
    const { renterId, itemId, startDate, endDate } = req.body;

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || !item.isForRent || item.status !== "available") {
      return res.status(400).json({ error: "Item not available for rent" });
    }

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    const rental = await prisma.rental.create({
      data: {
        renterId,
        itemId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalRent: days * (item.rentPrice || 0),
        deposit: item.price * 0.2,
      },
    });

    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: "Failed to rent item" });
  }
};

// ---------------- BUYER ORDERS ----------------
export const getBuyerOrders = async (req, res) => {
  try {
    // Hardcoded orders for demo
    const orders = [
      {
        id: 1001,
        amount: 1250,
        status: "completed",
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        item: {
          id: 1,
          name: "Introduction to Algorithms, 4th Edition",
          images: JSON.stringify(["https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"]),
          price: 1250
        },
        seller: {
          name: "Rahul Sharma"
        }
      },
      {
        id: 1002,
        amount: 450,
        status: "shipped",
        createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
        item: {
          id: 4,
          name: "Dorm Room LED Strip Lights",
          images: JSON.stringify(["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"]),
          price: 450
        },
        seller: {
          name: "Kavita Singh"
        }
      }
    ];
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// ---------------- BUYER RENTALS ----------------
export const getBuyerRentals = async (req, res) => {
  try {
    const renterId = +req.params.renterId;
    const rentals = await prisma.rental.findMany({
      where: { renterId },
      include: { item: true },
    });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rentals" });
  }
};

// ---------------- ADD REVIEW ----------------
export const addReview = async (req, res) => {
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

// ---------------- GET NOTIFICATIONS ----------------
export const getNotifications = async (req, res) => {
  try {
    const userId = +req.params.userId;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
