import { Food } from "../models/food.model.js";

export const foodController = {
    addFoodItem: async (req, res) => {
      try {
        const {name , description , price , category, image , isAvailable} = req.body;

        const foodItem = new Food({
          name,
          description,
          price,
          category,
          image,
          isAvailable
        });

        await foodItem.save();
        res.status(201).json({
          success: true,
          message:"Food item added successfully",
          data: foodItem
        })
        
      } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    },
    updateFoodItem: async (req, res) => {
      try {
        const {id} = req.params;

        const {name, description, price, category, image, isAvailable} = req.body;

        const foodItem = await Food.findByIdAndUpdate(id, {
          name,
          description,
          price,
          category,
          image,
          isAvailable
        }, { new: true });

        if (!foodItem) {
          return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({
          success: true,
          message: "Food item updated successfully",
          data: foodItem
        });

      } catch (error) {
        console.error("Error updating food item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    },
    deleteFoodItem: async (req, res) => {
      try {
        const { id } = req.params;

        const foodItem = await Food.findByIdAndDelete(id);

        if (!foodItem) {
          return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({
          success: true,
          message: "Food item deleted successfully",
          data: foodItem
        });

      } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    },
    getFoodItemById: async (req, res) => {
      try {
        const { id } = req.params;

        const foodItem = await Food.findById(id);

        if (!foodItem) {
          return res.status(404).json({ message: "Food item not found" });
        }

        res.status(200).json({
          success: true,
          data: foodItem
        });

      } catch (error) {
        console.error("Error fetching food item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    },
    getAllFoodItems: async (req, res) => {
      try {
        const foodItems = await Food.find();

        res.status(200).json({
          success: true,
          data: foodItems
        });

      } catch (error) {
        console.error("Error fetching all food items:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }
};