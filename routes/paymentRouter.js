import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  checkoutController,
  getAllPaymentsController,
  getUserPaymentsController,
} from "../controllers/paymentController.js";


const router = express.Router();

// Checkout and Payment routes
router.post("/checkout", requireSignIn, checkoutController);

// Admin routes to view all payments
router.get("/admin/orders", requireSignIn, isAdmin, getAllPaymentsController);

// User routes to view their payment history
router.get("/user/payments/:userEmail", requireSignIn, getUserPaymentsController);

export default router;