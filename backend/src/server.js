import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/seller.routes.js";
import buyerRoutes from "./routes/buyer.routes.js";
import interactionRoutes from "./routes/interaction.routes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/interaction", interactionRoutes);

app.get("/", (req, res) => res.send("Campus Closet Backend Running "));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));