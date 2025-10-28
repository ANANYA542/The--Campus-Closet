import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

export default app;