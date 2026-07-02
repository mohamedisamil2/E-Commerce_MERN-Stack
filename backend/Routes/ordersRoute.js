import express from "express";
import { createOrders, getOrders } from "../Controller/ordersController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrders);
router.get("/", protect, getOrders);

export default router;
