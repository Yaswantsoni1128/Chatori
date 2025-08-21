import express from "express";
import { foodController } from "../controllers/food.controller.js";

const router = express.Router();

router.post("/", foodController.addFoodItem);
router.put("/:id", foodController.updateFoodItem);
router.delete("/:id", foodController.deleteFoodItem);
router.get("/:id", foodController.getFoodItemById);
router.get("/", foodController.getAllFoodItems);

export default router;
