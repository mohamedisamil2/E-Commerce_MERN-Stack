import express from "express";
import {
  authUsers,
  getProfileUsers,
  logoutUsers,
  registerUsers,
  updateProfileUsers,
} from "../Controller/usersController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUsers);
router.post("/auth", authUsers);
router.post("/logout", logoutUsers);
router.get("/profile", protect, getProfileUsers);
router.put("/profile", protect, updateProfileUsers);

export default router;
