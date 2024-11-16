import express from "express";
import {
  createTicket,
  getTickets,
  getAllTickets,
  addNote,
  updateStatus,
} from "../controllers/ticketController.js";
import { protect, admin, agentOrAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../controllers/ticketController.js";

const router = express.Router();

// Protect routes by role-based middleware
router.post("/create", protect, createTicket);
router.get("/", protect, getTickets);
router.get("/unautorised", getAllTickets);
router.post(
  "/:ticketId/add/notes",
  upload.single("attachment"),
  protect,
  addNote
);
router.put("/:ticketId/status", protect, agentOrAdmin, updateStatus); // Only admins can update ticket status

export default router;
