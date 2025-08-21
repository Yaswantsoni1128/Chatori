import express from "express";
import { ordersController } from "../controllers/orders.cotroller.js";

const router = express.Router();

router.post("/", ordersController.placeOrder);
router.get("/user/:userId", ordersController.getOrdersByUser);
router.get("/", ordersController.getAllOrders);
router.put("/:orderId", ordersController.updateOrder);
router.get("/:orderId", ordersController.getOrderById);

export default router;
