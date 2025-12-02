import express from "express";
import { getProductsByCategorySlug } from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/:slug/products", getProductsByCategorySlug);

export default router;
