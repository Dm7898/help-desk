import express from "express";
import {
  register,
  login,
  getAllCustomers,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/customers", getAllCustomers);

export default router;
