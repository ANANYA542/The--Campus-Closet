import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/seller.routes.js";
import buyerRoutes from "./routes/buyer.routes.js";
import interactionRoutes from "./routes/interaction.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productsRoutes from "./routes/products.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { initSocket } from "./socket/index.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/interaction", interactionRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);
app.use("/api", chatRoutes);

app.get("/", (req, res) => res.send("🚀 Campus Closet Backend Running"));

const io = initSocket(server);
app.set("io", io);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
