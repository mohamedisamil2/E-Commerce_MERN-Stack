import express from "express";
import {
  getAllProducts,
  getProductsById,
} from "../Controller/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:title", getProductsById);

export default router;
