import express from "express";
import { reviewController } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/:foodId", reviewController.getFoodReviews);
router.put("/:reviewId", reviewController.updateReview);
router.delete("/:reviewId", reviewController.deleteReview);

export default router;
