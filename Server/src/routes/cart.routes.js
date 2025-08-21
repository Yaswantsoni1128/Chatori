import express from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", cartController.addToCart);
router.get("/:userId", cartController.getCart);
router.delete("/", cartController.removeFromCart);
router.delete("/item", cartController.decreaseItemQty);
router.delete("/:userId", cartController.clearCart);
router.get("/:userId/bill-summary", cartController.getBillSummary);

export default router;
