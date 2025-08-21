import express from "express";
import { foodController } from "../controllers/food.controller.js";

const router = express.Router();

router.post("/food", foodController.addFoodItem);
router.put("/food/:id", foodController.updateFoodItem);
router.delete("/food/:id", foodController.deleteFoodItem);
router.get("/food/:id", foodController.getFoodItemById);
router.get("/food", foodController.getAllFoodItems);

export default router;
