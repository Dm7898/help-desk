import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();
router.post("/add/user", protect, admin, createUser);
router.get("/users", protect, admin, getAllUsers);
router.put("/:userId/update", protect, admin, updateUser);
router.delete("/:userId/delete", protect, admin, deleteUser);
export default router;
