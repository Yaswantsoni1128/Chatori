import Review from "../models/review.model.js";
import { Food } from "../models/food.model.js";

export const reviewController = {
  createReview: async (req, res) => {
    try {
      const { foodId, rating, comment , userId} = req.body;

      // Check if food exists
      const food = await Food.findById(foodId);
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      // Check if user already reviewed
      const existingReview = await Review.findOne({ foodId, userId });
      if (existingReview) {
        return res
          .status(400)
          .json({ message: "You already reviewed this food" });
      }

      const review = new Review({ foodId, userId, rating, comment });
      await review.save();

      res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: review,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  getFoodReviews: async (req, res) => {
    try {
      const { foodId } = req.params;
      const reviews = await Review.find({ foodId }).populate(
        "userId",
        "name email"
      );

      res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment , userId} = req.body;

      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      if (review.userId.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this review" });
      }

      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
      await review.save();

      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: review,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { reviewId  } = req.params;
      const { userId } = req.body;

      const review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      if (review.userId.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this review" });
      }

      await review.deleteOne();

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  
};
