import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  createConversation,
  getUserConversations,
  getMessages,
  postMessage,
} from "../controllers/chat.controller.js";
import { markRead } from "../controllers/chat.controller.js";

const router = Router();

router.post("/conversations", authenticateUser, createConversation);
router.get("/conversations/:userId", authenticateUser, getUserConversations);
router.get("/messages/:conversationId", authenticateUser, getMessages);
router.post("/messages", authenticateUser, postMessage);
router.post("/messages/read", authenticateUser, markRead);

export default router;
