import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) return next(new Error("No auth token"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (conversationId) => {
      socket.join(String(conversationId));
    });

    socket.on("typing", ({ conversationId }) => {
      socket.to(String(conversationId)).emit("typing");
    });

    socket.on("sendMessage", async ({ conversationId, content }) => {
      try {
        const message = await prisma.message.create({
          data: { conversationId, senderId: socket.user.id, content },
        });
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });
        io.to(String(conversationId)).emit("receiveMessage", message);
      } catch (err) {
        console.error("sendMessage error", err);
      }
    });
  });

  return io;
};
