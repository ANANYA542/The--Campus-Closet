import prisma from "../config/db.js";

export const createConversation = async (req, res) => {
  try {
    const { buyerId, sellerId, itemId } = req.body;
    if (!buyerId || !sellerId) {
      return res.status(400).json({ message: "buyerId and sellerId are required" });
    }
    const conversation = await prisma.conversation.upsert({
      where: {
        buyerId_sellerId_itemId: { buyerId, sellerId, itemId: itemId ?? null },
      },
      update: {},
      create: { buyerId, sellerId, itemId },
      include: { item: true },
    });
    return res.json(conversation);
  } catch (err) {
    console.error("createConversation error", err);
    return res.status(500).json({ message: "Failed to create conversation" });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await prisma.conversation.findMany({
      where: { OR: [{ buyerId: Number(userId) }, { sellerId: Number(userId) }] },
      include: {
        item: true,
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
        buyer: { select: { id: true, name: true, avatarUrl: true } },
        seller: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const list = conversations.map((c) => {
      const last = c.messages[0] || null;
      return {
        id: c.id,
        item: c.item ? { id: c.item.id, name: c.item.name, images: c.item.images } : null,
        buyer: c.buyer,
        seller: c.seller,
        lastMessage: last ? { content: last.content, createdAt: last.createdAt } : null,
        updatedAt: c.updatedAt,
      };
    });
    return res.json(list);
  } catch (err) {
    console.error("getUserConversations error", err);
    return res.status(500).json({ message: "Failed to load conversations" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await prisma.message.findMany({
      where: { conversationId: Number(conversationId) },
      orderBy: { createdAt: "asc" },
    });
    return res.json(messages);
  } catch (err) {
    console.error("getMessages error", err);
    return res.status(500).json({ message: "Failed to load messages" });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content } = req.body;
    if (!conversationId || !senderId || !content) {
      return res.status(400).json({ message: "conversationId, senderId, content required" });
    }
    const message = await prisma.message.create({
      data: { conversationId, senderId, content },
    });
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    const io = req.app.get("io");
    if (io) {
      io.to(String(conversationId)).emit("receiveMessage", message);
    }
    return res.status(201).json(message);
  } catch (err) {
    console.error("postMessage error", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
};

export const markRead = async (req, res) => {
  try {
    const { conversationId, userId } = req.body;
    await prisma.message.updateMany({
      where: { conversationId: Number(conversationId), senderId: { not: Number(userId) }, isRead: false },
      data: { isRead: true },
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("markRead error", err);
    return res.status(500).json({ message: "Failed to mark read" });
  }
};
