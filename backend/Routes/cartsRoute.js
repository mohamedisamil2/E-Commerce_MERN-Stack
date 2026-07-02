import express from "express";
import {
  addToCart,
  clearItemFromCart,
  deleteItemFromCart,
  getAllItemFromCart,
  getItemByIdFromCart,
  updateQtyInCart,
} from "../Controller/cartsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/:id", protect, getItemByIdFromCart);
router.get("/", protect, getAllItemFromCart);
router.put("/qty", protect, updateQtyInCart);
router.delete("/clear", protect, clearItemFromCart);
router.delete("/:productId", protect, deleteItemFromCart);

export default router;
