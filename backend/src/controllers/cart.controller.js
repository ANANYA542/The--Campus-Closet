import prisma from "../config/db.js";

// ADD TO CART 
export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity = 1 } = req.body;

        // Verify item exists and is available
        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item || item.status !== "available") {
            return res.status(400).json({ error: "Item not available" });
        }

        // Check if cart entry already exists
        const existing = await prisma.cartItem.findFirst({
            where: { userId, itemId },
        });

        if (existing) {
            // Increment quantity
            const updated = await prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
            return res.json(updated);
        }

        const cartItem = await prisma.cartItem.create({
            data: { userId, itemId, quantity },
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

// REMOVE FROM CART 
export const removeFromCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.cartItem.delete({ where: { id } });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
};

// GET CART 
export const getCart = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { item: true },
        });
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

// CHECKOUT CART 
export const checkoutCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { item: true },
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Begin transaction-like process
        const createdTransactions = [];
        for (const ci of cartItems) {
            const item = ci.item;
            if (!item || item.status !== "available") {
                return res.status(400).json({ error: `Item ${item?.id} not available` });
            }
            const trx = await prisma.transaction.create({
                data: {
                    buyerId: userId,
                    sellerId: item.ownerId,
                    itemId: item.id,
                    amount: item.price,
                    status: "completed",
                },
            });
            // Mark item as sold
            await prisma.item.update({
                where: { id: item.id },
                data: { status: "sold" },
            });
            createdTransactions.push(trx);
        }

        // Clear cart
        await prisma.cartItem.deleteMany({ where: { userId } });

        res.status(201).json({ transactions: createdTransactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to checkout cart" });
    }
};