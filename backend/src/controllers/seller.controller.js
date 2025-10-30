const prisma = require("../config/db");

const addItem = async (req, res) => {
  try {
    const { sellerId, name, description, category, price, rentPrice, condition, isForRent, images } = req.body;
    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        category,
        price,
        rentPrice,
        condition,
        isForRent,
        images,
        owner: { connect: { id: sellerId } },
      },
    });
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

const getSellerItems = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.sellerId);
    const items = await prisma.item.findMany({
      where: { ownerId: sellerId },
      include: { rentals: true, transactions: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seller items" });
  }
};

const updateItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedItem = await prisma.item.update({
      where: { id },
      data: req.body,
    });
    res.json({ success: true, updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.item.delete({ where: { id } });
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

const getSellerStats = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.sellerId);
    const [totalItems, totalSales, totalRentals, revenue] = await Promise.all([
      prisma.item.count({ where: { ownerId: sellerId } }),
      prisma.transaction.count({ where: { sellerId } }),
      prisma.rental.count({ where: { item: { ownerId: sellerId } } }),
      prisma.transaction.aggregate({
        where: { sellerId },
        _sum: { amount: true },
      }),
    ]);
    res.json({
      totalItems,
      totalSales,
      totalRentals,
      totalRevenue: revenue._sum.amount || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seller stats" });
  }
};

const getSellerTransactions = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.sellerId);
    const transactions = await prisma.transaction.findMany({
      where: { sellerId },
      include: { buyer: true, item: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

const getSellerRentals = async (req, res) => {
  try {
    const sellerId = parseInt(req.params.sellerId);
    const rentals = await prisma.rental.findMany({
      where: { item: { ownerId: sellerId } },
      include: { renter: true, item: true },
      orderBy: { startDate: "desc" },
    });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rentals" });
  }
};

const approveRental = async (req, res) => {
  try {
    const rentalId = parseInt(req.params.rentalId);
    const rental = await prisma.rental.update({
      where: { id: rentalId },
      data: { status: "active" },
      include: { item: true, renter: true },
    });
    await prisma.item.update({
      where: { id: rental.itemId },
      data: { status: "rented" },
    });
    res.json({ success: true, rental });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve rental" });
  }
};

const endRental = async (req, res) => {
  try {
    const rentalId = parseInt(req.params.rentalId);
    const rental = await prisma.rental.update({
      where: { id: rentalId },
      data: { status: "returned" },
      include: { item: true },
    });
    await prisma.item.update({
      where: { id: rental.itemId },
      data: { status: "available" },
    });
    res.json({ success: true, message: "Rental ended successfully", rental });
  } catch (error) {
    res.status(500).json({ error: "Failed to end rental" });
  }
};

module.exports = {
  addItem,
  getSellerItems,
  updateItem,
  deleteItem,
  getSellerStats,
  getSellerTransactions,
  getSellerRentals,
  approveRental,
  endRental,
};
